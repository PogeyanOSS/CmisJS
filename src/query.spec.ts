import { cmis } from './cmis';
import { assert } from 'chai';
import 'mocha';

let username = 'admin';
let password = 'admin123';
let url = 'http://localhost:9089/MongoTest';


if (undefined !== process && undefined != process.env) {

    url = process.env.CMIS_URL || url;
    username = process.env.CMIS_USERNAME || username;
    password = process.env.CMIS_PASSWORD || password;

} else if (undefined !== window) {

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

let session = new cmis.CmisSession(url);
session.setCredentials(username, password);

//session.setErrorHandler(err => console.log(err.stack));

describe('CmisJS library test', function () {

    this.timeout(10000);

    it('should connect to a repository', done => {
        session.loadRepositories().then(() => {
            assert(parseFloat(session.defaultRepository.cmisVersionSupported) >= .99, "CMIS Version should be at least 1.0");
            //session.defaultRepository.repositoryUrl = session.defaultRepository.repositoryUrl.replace('18080','8888');
            //session.defaultRepository.rootFolderUrl = session.defaultRepository.rootFolderUrl.replace('18080','8888');
            console.log(session.defaultRepository.rootFolderUrl);

            done();
        }).catch(err => done(err));
    });

    it('should get repository informations', done => {
        session.getRepositoryInfo().then(data => {
            var id = session.defaultRepository.repositoryId;
            assert(id == data[id].repositoryId, "id should be the same");
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

    it('should evalute relationship query', done => {
        session.query(queryJson).then(data => {
            assert(data > 1, "Empty data");
            done();
        }).catch(err => {
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

    it('should evalute relationship query', done => {
        session.query(queryJsonByTarget).then(data => {
            assert(data > 1, "Empty data");
            done();
        }).catch(err => {
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
    }

    it('should evalute relationship query for or case', done => {
        session.query(queryJsonWithOrCase).then(data => {
            assert(data > 1, "Empty data");
            done();
        }).catch(err => {
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
    }

    it('should evalute relationship query for nested or case', done => {
        session.query(queryJsonNestedWithOrCase).then(data => {
            assert(data > 1, "Empty data");
            done();
        }).catch(err => {
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
    }

    it('should evalute relationship query to sort in ascending order', done => {
        session.query(queryJsonInAscendingOrder).then(data => {
            assert(data > 1, "Empty data");
            done();
        }).catch(err => {
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
    }

    it('should evalute relationship query to sort in descending order', done => {
        session.query(queryJsonInDescendingOrder).then(data => {
            assert(data > 1, "Empty data");
            done();
        }).catch(err => {
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
    }

    it('should evalute relationship query with offset/pagination', done => {
        session.query(queryJsonWithPagination).then(data => {
            assert(data > 1, "Empty data");
            done();
        }).catch(err => {
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
    }


    it('should evalute relationship query with nested relationship', done => {
        session.query(queryJsonNestedTwoLevelRelationship).then(data => {
            assert(data > 1, "Empty data");
            done();
        }).catch(err => {
            done(err);
        });
    });
});
