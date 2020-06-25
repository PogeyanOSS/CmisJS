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
    it('bulk insert tests', function (done) {
        var props = {};
        var itemList = new Array();
        var docList = new Array();
        var folList = new Array();
        var polList = new Array();
        var relList = new Array();
        var aces = {};
        aces["UserA"] = ['cmis:all'];
        for (var i_1 = 0; i_1 < 10; i_1++) {
            var input = { "cmis:objectId": "Item_" + i_1, "cmis:name": "Item_" + i_1, "cmis:objectTypeId": "cmis:item" };
            input["addAces"] = aces;
            input["policies"] = ["policy123"];
            itemList.push(input);
        }
        itemList.push({ "source_table": "cmis:folder", "target_table": "cmis:document", "cmis:name": "folder_document", "cmis:objectTypeId": "cmis_ext:relationmd" });
        for (var i_2 = 0; i_2 < 10; i_2++) {
            var input = { "cmis:objectId": "Doc_" + i_2, "cmis:name": "Doc_" + i_2, "cmis:objectTypeId": "cmis:document" };
            input["addAces"] = aces;
            input["policies"] = ["policy123"];
            docList.push(input);
        }
        for (var i_3 = 0; i_3 < 10; i_3++) {
            var input = { "cmis:objectId": "Fol_" + i_3, "cmis:name": "Fol_" + i_3, "cmis:objectTypeId": "cmis:folder" };
            input["addAces"] = aces;
            input["policies"] = ["policy123"];
            folList.push(input);
        }
        for (var i_4 = 0; i_4 < 10; i_4++) {
            var input = { "cmis:objectId": "Pol_" + i_4, "cmis:name": "Pol_" + i_4, "cmis:objectTypeId": "cmis:policy" };
            input["addAces"] = aces;
            input["policies"] = ["policy123"];
            polList.push(input);
        }
        for (var i_5 = 0; i_5 < 10; i_5++) {
            var input = { "relation_name": "folder_document", "cmis:name": "Rel_" + i_5, "cmis:objectTypeId": "cmis_ext:relationship", "cmis:sourceId": "Fol_" + i_5, "cmis:targetId": "Doc_" + i_5 };
            input["addAces"] = aces;
            input["policies"] = ["policy123"];
            relList.push(input);
        }
        props["createItem"] = itemList;
        props["createDocument"] = docList;
        props["createFolder"] = folList;
        props["createPolicy"] = polList;
        props["createRelationship"] = relList;
        session.bulkInsert(props).then(function (data) {
            chai_1.assert(data.success.objects[0].object.succinctProperties["cmis:name"] === "Item_0", "name should be Item_0");
            done();
        });
    });
    it('bulk update tests', function (done) {
        var props = {};
        var updateList = new Array();
        updateList.push({ "cmis:objectId": "Item_0", "cmis:name": "Item_Updated", "cmis:objectTypeId": "cmis:item" });
        updateList.push({ "cmis:objectId": "Doc_0", "cmis:name": "Doc_Updated", "cmis:objectTypeId": "cmis:document" });
        updateList.push({ "cmis:objectId": "Fol_0", "cmis:name": "Fol_Updated", "cmis:objectTypeId": "cmis:folder" });
        updateList.push({ "cmis:objectId": "Pol_0", "cmis:name": "Pol_Updated", "cmis:objectTypeId": "cmis:policy" });
        props["update"] = updateList;
        session.bulkUpdate(props).then(function (data) {
            chai_1.assert(data.objects[0].object.succinctProperties["cmis:name"] === "Item_Updated", "name should be Item_Updated");
            chai_1.assert(data.objects[1].object.succinctProperties["cmis:name"] === "Doc_Updated", "name should be Doc_Updated");
            chai_1.assert(data.objects[2].object.succinctProperties["cmis:name"] === "Fol_Updated", "name should be Fol_Updated");
            chai_1.assert(data.objects[3].object.succinctProperties["cmis:name"] === "Pol_Updated", "name should be Pol_Updated");
            done();
        });
    });
    it('bulk insert tests for Doc uploads', function (done) {
        var props = {};
        var docList = new Array();
        var aces = {};
        aces["UserA"] = ['cmis:all'];
        for (var i_6 = 20; i_6 < 25; i_6++) {
            var input = { "cmis:objectId": "Doc_" + i_6, "cmis:name": "Doc_" + i_6, "cmis:objectTypeId": "cmis:document" };
            input["addAces"] = aces;
            input["content"] = {
                "content": 'default_' + i_6,
                "mimeTypeExtension": 'txt'
            };
            docList.push(input);
        }
        docList.push({
            "content": {
                "content": 'default_25',
                "filename": "default_25",
                "mimeTypeExtension": 'txt'
            }, "cmis:objectId": "Doc_25", "cmis:name": "Doc_25", "cmis:objectTypeId": "cmis:document"
        });
        docList.push({
            "content": {
                "content": 'default_26',
                "filename": "default_26.txt"
            }, "cmis:objectId": "Doc_26", "cmis:name": "Doc_26", "cmis:objectTypeId": "cmis:document"
        });
        props["createDocument"] = docList;
        session.bulkInsert(props).then(function (data) {
            chai_1.assert(data.success.objects[0].object.succinctProperties["cmis:name"] === "Doc_20", "name should be Doc_20");
            done();
        });
    });
});
//# sourceMappingURL=cmis.spec.js.map