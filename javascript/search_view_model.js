var Resource = function(data) {
    this.name = data.name;
    this.product = data.product;
    this.team = data.team;
    this.region = data.region;
    this.status = data.status;
    this.account_num = data.account_num;
    this.account_name = data.account_name;
};

var ResourceListViewModel = function() {
    // Data
    var self = this;
    self.status = ko.observableArray(['Error', 'Active', 'Build', 'Creating', 'Resize',
                                      'Shutoff', 'Suspended', 'In-Use', 'Available',
                                      'Verify_Resize', 'Shutdown', 'Error_Deleting',
                                      'Deleted', 'Failed', 'Backup']);
    self.region = ko.observableArray(['DFW', 'ORD', 'IAD']);
    self.product = ko.observableArray(['Server', 'Database', 'Loadbalancer', 'Volume']);
    self.team = ko.observableArray(['Reach']);
    self.selectedRegion = ko.observable();
    self.selectedStatus = ko.observable();
    self.selectedTeam = ko.observable();
    self.selectedProduct = ko.observable();
    self.account = ko.observable();
   // self.selectedAcccount = ko.observable();
    self.resources = ko.observableArray([]);

    // Operations
    self.getIt = function() {
        var region = this.selectedRegion();
        var product = this.selectedProduct();
        var team = this.selectedTeam();
        var status = this.selectedStatus();
        var account = this.account();
        db_url = "http://localhost:3000/resources?";
        if(typeof team !== 'undefined') 
            { team = team.toLowerCase();
              db_url = db_url + '&team=' + team; }
        if(typeof account !== 'undefined') 
            { account = account.toLowerCase();
              db_url = db_url + '&account_name=' + account; }    
        if(typeof region !== 'undefined') 
            { db_url = db_url + "&region=" + region; }
        if(typeof product !== 'undefined') 
            { product = product.toLowerCase();
              db_url = db_url + '&product=' + product; }
        if(typeof status !== 'undefined') 
            { status = status.toLowerCase();
              db_url = db_url + '&status=' + status; }
    
        $.getJSON(db_url, function(allData) {
        var mappedResources = $.map(allData, function(item) { return new Resource(item);});
        self.resources(mappedResources);
        });
    };
       
};

ko.applyBindings(new ResourceListViewModel());
