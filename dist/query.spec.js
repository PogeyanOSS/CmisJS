"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cmis_1 = require("./cmis");
var chai_1 = require("chai");
require("mocha");
var username = 'admin';
var password = 'admin123';
var url = 'http://localhost:9089/MongoTest';
if (undefined !== process && undefined != process.env) {
    url = process.env.CMIS_URL || url;
    username = process.env.CMIS_USERNAME || username;
    password = process.env.CMIS_PASSWORD || password;
}
else if (undefined !== window) {
    var q = window.location.search.substring(1).split('&');
    for (var i = 0; i < q.length; i++) {
        var p = q[i].split("=");
        if (p[0] == 'username') {
            username = p[1];
        }
        if (p[0] == 'password') {
            password = p[1];
        }
    }
}
var session = new cmis_1.cmis.CmisSession(url);
session.setCredentials(username, password);
describe('CmisJS library test', function () {
    this.timeout(10000);
    it('should connect to a repository', function (done) {
        session.loadRepositories().then(function () {
            chai_1.assert(parseFloat(session.defaultRepository.cmisVersionSupported) >= .99, "CMIS Version should be at least 1.0");
            console.log(session.defaultRepository.rootFolderUrl);
            done();
        }).catch(function (err) { return done(err); });
    });
    it('should get repository informations', function (done) {
        session.getRepositoryInfo().then(function (data) {
            var id = session.defaultRepository.repositoryId;
            chai_1.assert(id == data[id].repositoryId, "id should be the same");
            done();
        });
    });
    var queryJson = {
        "size": 0,
        "filter": [],
        "sort": [],
        "fields": {
            "cq:order_cq:product": {
                "size": 10,
                "filter": [
                    {
                        "field": "cq:product.cq:status",
                        "operator": "eq",
                        "value": "Active"
                    }
                ],
                "sort": [
                    {
                        "field": "cq:product.cq:productId",
                        "operator": "asce"
                    }
                ]
            }
        }
    };
    it('should evalute relationship query', function (done) {
        session.query(queryJson).then(function (data) {
            chai_1.assert(data > 1, "Empty data");
            done();
        }).catch(function (err) {
            done(err);
        });
    });
    var queryJsonByTarget = {
        "size": 0,
        "filter": [],
        "sort": [],
        "fields": {
            "cq:product.cq:productId": {},
            "cq:order_cq:product": {
                "size": 10,
                "sort": [
                    {
                        "field": "cq:order.cq:orderId",
                        "operator": "asce"
                    }
                ],
                "fields": {
                    "cq:order.cq:orderId": {}
                },
                "direction": "target"
            }
        }
    };
    it('should evalute relationship query', function (done) {
        session.query(queryJsonByTarget).then(function (data) {
            chai_1.assert(data > 1, "Empty data");
            done();
        }).catch(function (err) {
            done(err);
        });
    });
    var queryJsonWithOrCase = {
        "size": 10,
        "step": 0,
        "filter": [
            {
                "field": "cq:order.cq:orderName",
                "operator": "eq",
                "value": "xyz",
                "type": "or"
            }
        ],
        "sort": [],
        "fields": {
            "cq:order.cq:orderId": {},
            "cq:order_cq:product": {
                "size": 100,
                "filter": [],
                "fields": {
                    "cq:product.cq:productId": {}
                },
            }
        }
    };
    it('should evalute relationship query for or case', function (done) {
        session.query(queryJsonWithOrCase).then(function (data) {
            chai_1.assert(data > 1, "Empty data");
            done();
        }).catch(function (err) {
            done(err);
        });
    });
    var queryJsonNestedWithOrCase = {
        "size": 10,
        "step": 0,
        "filter": [
            {
                "field": "cq:order.cq:orderName",
                "operator": "eq",
                "value": "xyz",
                "type": "or"
            }
        ],
        "sort": [],
        "fields": {
            "cq:order.cq:orderId": {},
            "cq:order_cq:product": {
                "size": 100,
                "step": 0,
                "filter": [
                    {
                        "field": "cq:product.cq:status",
                        "operator": "eq",
                        "value": "Active",
                        "type": "or"
                    }
                ],
                "fields": {
                    "cq:product.cq:productId": {}
                }
            }
        }
    };
    it('should evalute relationship query for nested or case', function (done) {
        session.query(queryJsonNestedWithOrCase).then(function (data) {
            chai_1.assert(data > 1, "Empty data");
            done();
        }).catch(function (err) {
            done(err);
        });
    });
    var queryJsonInAscendingOrder = {
        "size": 10,
        "step": 0,
        "filter": [
            {
                "field": "cq:order.cq:orderName",
                "operator": "eq",
                "value": "xyz",
                "type": "or"
            }
        ],
        "sort": [],
        "fields": {
            "cq:order.cq:orderId": {},
            "cq:order_cq:product": {
                "size": 100,
                "step": 0,
                "filter": [
                    {
                        "field": "cq:product.cq:status",
                        "operator": "eq",
                        "value": "Active",
                        "type": "or"
                    }
                ],
                "sort": [
                    {
                        "field": "cq:product.productId",
                        "operator": "asc"
                    }
                ],
                "fields": {
                    "cq:product.cq:productId": {},
                    "cq:product.cq:productName": {}
                }
            }
        }
    };
    it('should evalute relationship query to sort in ascending order', function (done) {
        session.query(queryJsonInAscendingOrder).then(function (data) {
            chai_1.assert(data > 1, "Empty data");
            done();
        }).catch(function (err) {
            done(err);
        });
    });
    var queryJsonInDescendingOrder = {
        "size": 10,
        "step": 1,
        "filter": [
            {
                "field": "cq:order.cq:orderName",
                "operator": "eq",
                "value": "xyz",
                "type": "or"
            }
        ],
        "sort": [],
        "fields": {
            "cq:order.cq:orderId": {},
            "cq:order_cq:product": {
                "size": 100,
                "step": 1,
                "filter": [
                    {
                        "field": "cq:product.cq:status",
                        "operator": "eq",
                        "value": "Active",
                        "type": "or"
                    }
                ],
                "sort": [
                    {
                        "field": "cq:product.productId",
                        "operator": "dsc"
                    }
                ],
                "fields": {
                    "cq:product.cq:productId": {}
                }
            }
        }
    };
    it('should evalute relationship query to sort in descending order', function (done) {
        session.query(queryJsonInDescendingOrder).then(function (data) {
            chai_1.assert(data > 1, "Empty data");
            done();
        }).catch(function (err) {
            done(err);
        });
    });
    var queryJsonWithPagination = {
        "size": 10,
        "step": 1,
        "filter": [
            {
                "field": "cq:order.cq:orderName",
                "operator": "eq",
                "value": "xyz",
                "type": "or"
            }
        ],
        "sort": [],
        "fields": {
            "cq:order.cq:orderId": {},
            "cq:order_cq:product": {
                "size": 100,
                "step": 1,
                "filter": [
                    {
                        "field": "cq:product.cq:status",
                        "operator": "eq",
                        "value": "Active",
                        "type": "or"
                    }
                ],
                "sort": [
                    {
                        "field": "cq:product.productId",
                        "operator": "dsc"
                    }
                ],
                "fields": {
                    "cq:product.cq:productId": {}
                }
            }
        }
    };
    it('should evalute relationship query with offset/pagination', function (done) {
        session.query(queryJsonWithPagination).then(function (data) {
            chai_1.assert(data > 1, "Empty data");
            done();
        }).catch(function (err) {
            done(err);
        });
    });
    var queryJsonNestedTwoLevelRelationship = {
        "size": 10,
        "step": 0,
        "filter": [
            {
                "field": "cq:order.cq:orderName",
                "operator": "eq",
                "value": "xyz",
                "type": "or"
            }
        ],
        "sort": [],
        "fields": {
            "cq:order.cq:orderId": {},
            "cq:order_cq:product": {
                "size": 100,
                "step": 0,
                "filter": [
                    {
                        "field": "cq:product.cq:status",
                        "operator": "eq",
                        "value": "Active",
                        "type": "or"
                    }
                ],
                "fields": {
                    "cq:product.cq:productId": {},
                    "cq:product.cq:productName": {},
                    "cq:product_cq:productStatus": {}
                },
            }
        }
    };
    it('should evalute relationship query with nested relationship', function (done) {
        session.query(queryJsonNestedTwoLevelRelationship).then(function (data) {
            chai_1.assert(data > 1, "Empty data");
            done();
        }).catch(function (err) {
            done(err);
        });
    });
});
//# sourceMappingURL=query.spec.js.map