!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e(require("cross-fetch/polyfill"),require("isomorphic-base64"),require("isomorphic-form-data"),require("url-search-params-polyfill"));else if("function"==typeof define&&define.amd)define(["cross-fetch/polyfill","isomorphic-base64","isomorphic-form-data","url-search-params-polyfill"],e);else{var o="object"==typeof exports?e(require("cross-fetch/polyfill"),require("isomorphic-base64"),require("isomorphic-form-data"),require("url-search-params-polyfill")):e(t["cross-fetch/polyfill"],t.window,t.window,t["url-search-params-polyfill"]);for(var r in o)("object"==typeof exports?exports:t)[r]=o[r]}}("undefined"!=typeof self?self:this,function(t,e,o,r){return function(t){var e={};function o(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=t,o.c=e,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";(function(t){var r,i=this&&this.__extends||(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])},function(t,e){function o(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0}),o(2);var n=o(3);o(4),o(5),function(e){var o=t.Buffer,r=function(){return function(){this.succinct=!0}}(),s=function(t){function e(e){var o=t.call(this,e.statusText)||this;return o.response=e,o}return i(e,t),e}(Error);e.HTTPError=s;var c=function(){function t(t){this.options={succinct:!0},this.url=t}return t.prototype.setProperties=function(t,e){var o=0;for(var r in e){t["propertyId["+o+"]"]=r;var i=e[r];if(null!=i)if("[object Array]"==Object.prototype.toString.apply(i))for(var n=i,s=0;s<n.length;s++)t["propertyValue["+o+"]["+s+"]"]=n[s];else t["propertyValue["+o+"]"]=i;o++}},t.prototype.setPolicies=function(t,e){if(null!=e&&null!=e&&e.length>0)for(var o=0;o<e.length;o++)t["policy["+o+"]"]=e[o]},t.prototype.setACEs=function(t,e,o){var r=0;for(var i in e){t[o+"ACEPrincipal["+r+"]"]=i;for(var n=e[i],s=0;s<n.length;s++)t[o+"ACEPermission["+r+"]["+s+"]"]=e[i][s];r++}},t.prototype.setSecondaryTypeIds=function(t,e,o){for(var r=0;r<e.length;r++)t[o+"SecondaryTypeId["+r+"]"]=e[r]},t.prototype.addPropertiesIds=function(t,e){t["propertyId[0]"]="ids";for(var o=0;o<e.length;o++)t["propertyValue[0]["+o+"]"]=e[o]},t.prototype.http=function(t,e,r,i){var c,p=this,a={};for(var u in this.options)null!=this.options[u]&&void 0!==this.options[u]&&(a[u]=this.options[u]);for(var u in r)null!=r[u]&&void 0!==r[u]&&(a[u]=r[u]);this.username&&this.password?c="Basic "+n.btoa(this.username+":"+this.password):this.token&&(c="Bearer "+this.token);var l={method:t};if(c?l.headers={Authorization:c}:l.credentials="include",i){var d=new FormData,h=i.content;for(var u in"string"==typeof h?"undefined"!=typeof Blob&&(h=new Blob([h])):void 0!==o&&(h=new o(h)),d.append("content",h,i.mimeTypeExtension?i.filename+"."+i.mimeTypeExtension:i.filename),a)Array.isArray(a[u])?d.append(u,JSON.stringify(a[u])):d.append(u,""+a[u]);this.charset&&d.append("_charset_",this.charset),l.body=d}else{var f=new URLSearchParams;for(var u in a)f.set(u,a[u]);"GET"!==t?(l.body=f.toString(),l.headers["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8"):e=e+"?"+f.toString()}var y=fetch(e,l).then(function(t){if(t.status<200||t.status>299)throw new s(t);return t});return this.errorHandler&&y.catch(function(t){return p.errorHandler(t)}),y},t.prototype.httpBulkRequest=function(t,e,r,i){var c,p=this,a={};for(var u in this.options)null!=this.options[u]&&void 0!==this.options[u]&&(a[u]=this.options[u]);for(var u in r)null!=r[u]&&void 0!==r[u]&&(a[u]=r[u]);this.username&&this.password?c="Basic "+n.btoa(this.username+":"+this.password):this.token&&(c="Bearer "+this.token);var l={method:t};if(c?l.headers={Authorization:c}:l.credentials="include",null!=i&&null!=i){var d=new FormData;for(var u in i.forEach(function(t){var e=t.multipartData,r=e.content;"string"==typeof r?"undefined"!=typeof Blob&&(r=new Blob([r])):void 0!==o&&(r=new o(r)),d.append(t.name,r,e.mimeTypeExtension?e.filename+"."+e.mimeTypeExtension:e.filename)}),a)Array.isArray(a[u])?d.append(u,JSON.stringify(a[u])):d.append(u,""+a[u]);this.charset&&d.append("_charset_",this.charset),l.body=d}else{var h=new URLSearchParams;for(var u in a)h.set(u,a[u]);"GET"!==t?(l.body=h.toString(),l.headers["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8"):e=e+"?"+h.toString()}var f=fetch(e,l).then(function(t){if(t.status<200||t.status>299)throw new s(t);return t});return this.errorHandler&&f.catch(function(t){return p.errorHandler(t)}),f},t.prototype.get=function(t,e){return this.http("GET",t,e)},t.prototype.post=function(t,e,o){return this.http("POST",t,e,o)},t.prototype.postForBulk=function(t,e,o){return this.httpBulkRequest("POST",t,e,o)},t.prototype.setToken=function(t){return this.token=t,this},t.prototype.setCredentials=function(t,e){return this.username=t,this.password=e,this},t.prototype.setCharset=function(t){return this.charset=t,this},t.prototype.setErrorHandler=function(t){this.errorHandler=t},t.prototype.loadRepositories=function(){var t=this;return this.get(this.url,this.options).then(function(e){return e.json().then(function(e){for(var o in e){t.defaultRepository=e[o];break}t.repositories=e})})},t.prototype.deserializeSession=function(e){var o=JSON.parse(e),r=new t(o.url);return r.setCredentials(o.username,o.password),r.defaultRepository=o.defaultRepository,r.repositories=o.repositories,r},t.prototype.serializeSession=function(t){return JSON.stringify(t)},t.prototype.getRepositoryInfo=function(){return this.get(this.defaultRepository.repositoryUrl,{cmisselector:"repositoryInfo"}).then(function(t){return t.json()})},t.prototype.getTypeChildren=function(t,e,o){void 0===o&&(o={});var r=o;return r.cmisselector="typeChildren",r.typeId=t,r.includePropertyDefinitions=e,this.get(this.defaultRepository.repositoryUrl,r).then(function(t){return t.json()})},t.prototype.getTypeDescendants=function(t,e,o){return this.get(this.defaultRepository.repositoryUrl,{cmisselector:"typeDescendants",typeId:t,includePropertyDefinitions:o,depth:e}).then(function(t){return t.json()})},t.prototype.getTypeDefinition=function(t){return this.get(this.defaultRepository.repositoryUrl,{cmisselector:"typeDefinition",typeId:t}).then(function(t){return t.json()})},t.prototype.getCheckedOutDocs=function(t,e){void 0===e&&(e={});var o=e;return o.cmisselector="checkedout",this.get(this.defaultRepository.repositoryUrl,o).then(function(t){return t.json()})},t.prototype.query=function(t,e,o){void 0===e&&(e=!1),void 0===o&&(o={});var r=o;return r.cmisaction="query",r.statement=t,r.searchAllVersions=e,this.post(this.defaultRepository.repositoryUrl,r).then(function(t){return t.json()})},t.prototype.createType=function(t){return this.post(this.defaultRepository.repositoryUrl,{cmisaction:"createType",type:JSON.stringify(t)}).then(function(t){return t.json()})},t.prototype.updateType=function(t){return this.post(this.defaultRepository.repositoryUrl,{cmisaction:"updateType",type:JSON.stringify(t)}).then(function(t){return t.json()})},t.prototype.deleteType=function(t){return this.post(this.defaultRepository.repositoryUrl,{cmisaction:"deleteType",typeId:t}).then(function(t){return t.json()})},t.prototype.getObjectByPath=function(t,e){void 0===e&&(e={});var o=e;o.cmisselector="object";for(var r=t.split("/"),i=r.length-1;i>=0;i--)r[i]=encodeURIComponent(r[i]);return this.get(this.defaultRepository.rootFolderUrl+r.join("/"),o).then(function(t){return t.json()})},t.prototype.getObject=function(t,e,o){void 0===o&&(o={});var r=o;return r.cmisselector="object",r.objectId=t,r.returnVersion=e,this.get(this.defaultRepository.rootFolderUrl,r).then(function(t){return t.json()})},t.prototype.createFolder=function(t,e,o,i,n){void 0===o&&(o=[]),void 0===i&&(i={}),void 0===n&&(n={});var s=new r;return s.objectId=t,s.repositoryId=this.defaultRepository.repositoryId,s.cmisaction="createFolder",this.setProperties(s,e),this.setPolicies(s,o),this.setACEs(s,i,"add"),this.setACEs(s,n,"remove"),this.post(this.defaultRepository.rootFolderUrl,s).then(function(t){return t.json()})},t.prototype.getChildren=function(t,e){void 0===e&&(e={});var o=e;return o.cmisselector="children",o.objectId=t,this.get(this.defaultRepository.rootFolderUrl,o).then(function(t){return t.json()})},t.prototype.getDescendants=function(t,e,o){void 0===o&&(o={});var r=o;return r.cmisselector="descendants",e&&(r.depth=e),r.objectId=t,this.get(this.defaultRepository.rootFolderUrl,r).then(function(t){return t.json()})},t.prototype.getFolderTree=function(t,e,o){void 0===o&&(o={});var r=o;return r.cmisselector="folderTree",e&&(r.depth=e),r.objectId=t,this.get(this.defaultRepository.rootFolderUrl,r).then(function(t){return t.json()})},t.prototype.getFolderParent=function(t,e){void 0===e&&(e={});var o=e;return o.cmisselector="parent",o.objectId=t,this.get(this.defaultRepository.rootFolderUrl,o).then(function(t){return t.json()})},t.prototype.getParents=function(t,e){void 0===e&&(e={});var o=e;return o.cmisselector="parents",o.objectId=t,this.get(this.defaultRepository.rootFolderUrl,o).then(function(t){return t.json()})},t.prototype.getAllowableActions=function(t,e){void 0===e&&(e={});var o=e;return o.cmisselector="allowableActions",o.objectId=t,this.get(this.defaultRepository.rootFolderUrl,o).then(function(t){return t.json()})},t.prototype.getProperties=function(t,e,o){void 0===o&&(o={});var r=o;return r.cmisselector="properties",r.objectId=t,r.returnVersion=e,this.get(this.defaultRepository.rootFolderUrl,r).then(function(t){return t.json()})},t.prototype.updateProperties=function(t,e,o){void 0===o&&(o={});var r=o;return r.objectId=t,r.cmisaction="update",this.setProperties(o,e),this.post(this.defaultRepository.rootFolderUrl,r).then(function(t){return t.json()})},t.prototype.moveObject=function(t,e,o,r){void 0===r&&(r={});var i=r;return i.objectId=t,i.cmisaction="move",i.targetFolderId=o,i.sourceFolderId=e,this.post(this.defaultRepository.rootFolderUrl,i).then(function(t){return t.json()})},t.prototype.createDocument=function(t,e,o,r,i,n,s,c,p){void 0===p&&(p={});var a=p;"string"==typeof o&&(o={"cmis:name":o});var u=o||{};return u["cmis:objectTypeId"]||(u["cmis:objectTypeId"]="cmis:document"),i&&(a.versioningState=i),a.objectId=t,this.setProperties(a,u),n&&this.setPolicies(a,n),s&&this.setACEs(a,s,"add"),c&&this.setACEs(a,c,"remove"),a.repositoryId=this.defaultRepository.repositoryId,a.cmisaction="createDocument",this.post(this.defaultRepository.rootFolderUrl,a,{content:e,filename:u["cmis:name"],mimeTypeExtension:r}).then(function(t){return t.json()})},t.prototype.bulkUpdateProperties=function(t,e,o,i){void 0===e&&(e={}),void 0===o&&(o=[]),void 0===i&&(i=[]);for(var n=new r,s=t.length-1;s>=0;s--)n["objectId["+s+"]"]=t[s];return n.objectIds=t,this.setProperties(n,e),this.setSecondaryTypeIds(n,o,"add"),this.setSecondaryTypeIds(n,i,"remove"),n.cmisaction="bulkUpdate",this.post(this.defaultRepository.repositoryUrl,n).then(function(t){return t.json()})},t.prototype.getContentStream=function(t,e,o){void 0===e&&(e="inline");var i=new r;return i.cmisselector="content",i.objectId=t,i.download=e?"attachment":"inline",this.get(this.defaultRepository.rootFolderUrl,i)},t.prototype.createDocumentFromSource=function(t,e,o,r,i,n,s,c,p,a){void 0===a&&(a={});var u=a;"string"==typeof r&&(r={"cmis:name":r});var l=r||{};l["cmis:objectTypeId"]||(l["cmis:objectTypeId"]="cmis:document"),n&&(u.versioningState=n),u.objectId=t,this.setProperties(u,l),s&&this.setPolicies(u,s),c&&this.setACEs(u,c,"add"),p&&this.setACEs(u,p,"remove"),u.repositoryId=this.defaultRepository.repositoryId,u.sourceId=e,u.cmisaction="createDocumentFromSource";var d=null;return o&&(d={content:o,filename:l["cmis:name"],mimeTypeExtension:i}),this.post(this.defaultRepository.rootFolderUrl,u,d).then(function(t){return t.json()})},t.prototype.getContentStreamURL=function(t,e,o){void 0===e&&(e="inline");var i=new r;i.cmisselector="content",i.objectId=t,i.download=e,i.streamId=o;var n=new URLSearchParams;for(var s in i)null!=i[s]&&void 0!==i[s]&&n.append(s,i[s]);for(var s in this.options)n.has(s)||null==this.options[s]||void 0===this.options[s]||n.append(s,this.options[s]);return this.defaultRepository.rootFolderUrl+"?"+n.toString()},t.prototype.getRenditions=function(t,e){void 0===e&&(e={renditionFilter:"*"});var o=e;return o.cmisselector="renditions",o.objectId=t,this.get(this.defaultRepository.rootFolderUrl,o).then(function(t){return t.json()})},t.prototype.checkOut=function(t,e){void 0===e&&(e={});var o=e;return o.objectId=t,o.cmisaction="checkOut",this.post(this.defaultRepository.rootFolderUrl,o).then(function(t){return t.json()})},t.prototype.cancelCheckOut=function(t){var e=new r;return e.objectId=t,e.cmisaction="cancelCheckOut",this.post(this.defaultRepository.rootFolderUrl,e)},t.prototype.checkIn=function(t,e,o,r,i,n,s,c,p,a){void 0===e&&(e=!1),void 0===a&&(a={});var u=a;"string"==typeof o&&(o={"cmis:name":o});var l=o||{};return n&&(u.checkinComment=n),u.major=e,u.objectId=t,this.setProperties(u,l),s&&this.setPolicies(u,s),c&&this.setACEs(u,c,"add"),p&&this.setACEs(u,p,"remove"),u.cmisaction="checkIn",this.post(this.defaultRepository.rootFolderUrl,u,{content:r,mimeTypeExtension:i,filename:l["cmis:name"]}).then(function(t){return t.json()})},t.prototype.getObjectOfLatestVersion=function(t,e){void 0===e&&(e={major:!1});var o=e;return o.cmisselector="object",o.objectId=t,o.versionSeriesId=t,o.major=e.major,this.get(this.defaultRepository.rootFolderUrl,o).then(function(t){return t.json()})},t.prototype.setContentStream=function(t,e,o,r,i){void 0===o&&(o=!1),void 0===i&&(i={});var n=i;return n.objectId=t,n.overwriteFlag=o,n.cmisaction="setContent",this.post(this.defaultRepository.rootFolderUrl,n,{content:e,filename:r}).then(function(t){return t.json()})},t.prototype.appendContentStream=function(t,e,o,r,i){void 0===o&&(o=!1),void 0===i&&(i={});var n=i;return n.objectId=t,n.cmisaction="appendContent",n.isLastChunk=o,this.post(this.defaultRepository.rootFolderUrl,n,{content:e,filename:r}).then(function(t){return t.json()})},t.prototype.deleteContentStream=function(t,e){void 0===e&&(e={});var o=e;return o.objectId=t,o.cmisaction="deleteContent",this.post(this.defaultRepository.rootFolderUrl,o)},t.prototype.getAllVersions=function(t,e){void 0===e&&(e={});var o=e;return o.objectId=t,o.cmisselector="versions",this.get(this.defaultRepository.rootFolderUrl,o).then(function(t){return t.json()})},t.prototype.getAppliedPolicies=function(t,e){void 0===e&&(e={});var o=e;return o.objectId=t,o.cmisselector="policies",this.get(this.defaultRepository.rootFolderUrl,o).then(function(t){return t.json()})},t.prototype.getACL=function(t,e){void 0===e&&(e=!1);var o=new r;return o.objectId=t,o.onlyBasicPermissions=e,o.cmisselector="acl",this.get(this.defaultRepository.rootFolderUrl,o).then(function(t){return t.json()})},t.prototype.deleteObject=function(t,e,o){void 0===e&&(e=!1);var i=new r;return i.repositoryId=this.defaultRepository.repositoryId,i.cmisaction="delete",i.objectId=t,i.allVersions=e,i.forceDelete=o,this.post(this.defaultRepository.rootFolderUrl,i)},t.prototype.deleteTree=function(t,e,o,i,n){void 0===e&&(e=!1),void 0===n&&(n=!1);var s=new r;return s.repositoryId=this.defaultRepository.repositoryId,s.cmisaction="deleteTree",s.objectId=t,s.allVersions=!!e,s.forceDelete=o,i&&(s.unfileObjects=i),s.continueOnFailure=n,this.post(this.defaultRepository.rootFolderUrl,s)},t.prototype.getContentChanges=function(t,e,o,r,i){void 0===e&&(e=!1),void 0===o&&(o=!1),void 0===r&&(r=!1),void 0===i&&(i={});var n=i;return n.cmisselector="contentChanges",t&&(n.changeLogToken=t),n.includeProperties=e,n.includePolicyIds=o,n.includeACL=r,this.get(this.defaultRepository.repositoryUrl,n).then(function(t){return t.json()})},t.prototype.createRelationship=function(t,e,o,r,i){void 0===i&&(i={});var n=i;return this.setProperties(n,t),e&&this.setPolicies(n,e),o&&this.setACEs(n,o,"add"),r&&this.setACEs(n,r,"remove"),n.cmisaction="createRelationship",this.post(this.defaultRepository.repositoryUrl,n).then(function(t){return t.json()})},t.prototype.createPolicy=function(t,e,o,r,i,n){void 0===n&&(n={});var s=n;return s.objectId=t,this.setProperties(s,e),o&&this.setPolicies(s,o),r&&this.setACEs(s,r,"add"),i&&this.setACEs(s,i,"remove"),s.cmisaction="createPolicy",this.post(this.defaultRepository.repositoryUrl,s).then(function(t){return t.json()})},t.prototype.createItem=function(t,e,o,r,i,n){void 0===n&&(n={});var s=n;return s.objectId=t,this.setProperties(s,e),o&&this.setPolicies(s,o),r&&this.setACEs(s,r,"add"),i&&this.setACEs(s,i,"remove"),s.cmisaction="createItem",this.post(this.defaultRepository.repositoryUrl,s).then(function(t){return t.json()})},t.prototype.getLastResult=function(){return this.post(this.defaultRepository.repositoryUrl,{cmisaction:"lastResult"}).then(function(t){return t.json()})},t.prototype.addObjectToFolder=function(t,e,o,r){void 0===o&&(o=!1),void 0===r&&(r={});var i=r;return i.objectId=t,i.cmisaction="addObjectToFolder",i.allVersions=o,i.folderId=e,this.post(this.defaultRepository.rootFolderUrl,i).then(function(t){return t.json()})},t.prototype.removeObjectFromFolder=function(t,e,o){void 0===o&&(o={});var r=o;return r.objectId=t,r.cmisaction="removeObjectFromFolder",r.folderId=e,this.post(this.defaultRepository.rootFolderUrl,r).then(function(t){return t.json()})},t.prototype.getObjectRelationships=function(t,e,o,r,i){void 0===e&&(e=!1),void 0===i&&(i={});var n=i;return n.objectId=t,n.includeSubRelationshipTypes=e,n.relationshipDirection=o||"either",r&&(n.typeId=r),n.cmisselector="relationships",this.get(this.defaultRepository.rootFolderUrl,n).then(function(t){return t.json()})},t.prototype.applyPolicy=function(t,e,o){void 0===o&&(o={});var r=o;return r.objectId=t,r.policyId=e,r.cmisaction="applyPolicy",this.post(this.defaultRepository.rootFolderUrl,r).then(function(t){return t.json()})},t.prototype.removePolicy=function(t,e,o){void 0===o&&(o={});var r=o;return r.objectId=t,r.policyId=e,r.cmisaction="removePolicy",this.post(this.defaultRepository.rootFolderUrl,r).then(function(t){return t.json()})},t.prototype.applyACL=function(t,e,o,i){var n=new r;return n.objectId=t,n.cmisaction="applyACL",n.ACLPropagation=i,e&&this.setACEs(n,e,"add"),o&&this.setACEs(n,o,"remove"),this.post(this.defaultRepository.rootFolderUrl,n).then(function(t){return t.json()})},t.prototype.getAllObjects=function(t,e){void 0===e&&(e={});var o=e;return o.cmisaction="getAllObjects",this.addPropertiesIds(e,t),this.post(this.defaultRepository.repositoryUrl,o).then(function(t){return t.json()})},t.prototype.createHierarchyObject=function(t,e,o,r,i){void 0===i&&(i={});var n=i;return this.setProperties(n,t),e&&this.setPolicies(n,e),o&&this.setACEs(n,o,"add"),r&&this.setACEs(n,r,"remove"),n.cmisaction="createHierarchyObject",this.post(this.defaultRepository.repositoryUrl,n).then(function(t){return t.json()})},t.prototype.assignToHierarchy=function(t,e,o){void 0===o&&(o={});var r=o;return r.objectId=t,this.setProperties(r,e),r.cmisaction="assignToHierarchy",this.post(this.defaultRepository.repositoryUrl,r).then(function(t){return t.json()})},t.prototype.addUsersToHierarchy=function(t,e,o){void 0===o&&(o={});var r=o;return r.objectId=t,r.cmisaction="addUsersToHierarchy",this.setProperties(r,e),this.post(this.defaultRepository.rootFolderUrl,o).then(function(t){return t.json()})},t.prototype.removeUsersFromHierarchy=function(t,e,o){void 0===o&&(o={});var r=o;return r.objectId=t,this.setProperties(r,e),r.cmisaction="removeUsersFromHierarchy",this.post(this.defaultRepository.repositoryUrl,r).then(function(t){return t.json()})},t.prototype.moveHierarchy=function(t,e){void 0===e&&(e={});var o=e;return this.setProperties(o,t),o.cmisaction="moveHierarchy",this.post(this.defaultRepository.repositoryUrl,o).then(function(t){return t.json()})},t.prototype.deleteHierarchyObject=function(t,e,o){void 0===e&&(e=!1);var i=new r;return i.repositoryId=this.defaultRepository.repositoryId,i.cmisselector="deleteHierarchyObject",i.objectId=t,i.allVersions=e,i.forceDelete=o,this.get(this.defaultRepository.rootFolderUrl,i)},t.prototype.removeFromHierarchy=function(t,e,o){void 0===o&&(o={});var r=o;return r.objectId=t,this.setProperties(r,e),r.cmisaction="removeFromHierarchy",this.post(this.defaultRepository.repositoryUrl,r).then(function(t){return t.json()})},t.prototype.bulkDelete=function(t,e){void 0===e&&(e={});var o=e;return o.cmisaction="bulkdelete",this.addPropertiesIds(e,t),this.post(this.defaultRepository.repositoryUrl,o).then(function(t){return t.json()})},t.prototype.resetCache=function(){return this.get(this.defaultRepository.repositoryUrl+"/cache",{cmisselector:"resetcache"}).then(function(t){return t.json()})},t.prototype.resetCacheByKey=function(t,e){void 0===e&&(e={});var o=e;return o.key=t,o.cmisselector="resetcachebykey",this.get(this.defaultRepository.repositoryUrl+"/cache",o).then(function(t){return t.json()})},t.prototype.bulkInsert=function(t,o){void 0===o&&(o={});t.cmisaction="bulkinsert";var r=new Array,i=new Array,n=new Array,s=new Array,c=new Array,p=new Array;return null!=t.createItem&&null!=t.createItem&&(t.createItem.forEach(function(t){var o={},i=new e.CmisSession(null),n=t.addAces,s=t.removeAces,c=t.policies;i.setACEs(o,n,"add"),delete t.addAces,i.setACEs(o,s,"remove"),delete t.removeAces,i.setPolicies(o,c),delete t.policies,i.setProperties(o,t),r.push(o)}),delete t.createItem),null!=t.createDocument&&null!=t.createDocument&&(t.createDocument.forEach(function(t){var o={},r=new e.CmisSession(null),n=t.addAces,s=t.removeAces,c=t.policies;r.setACEs(o,n,"add"),delete t.addAces,r.setACEs(o,s,"remove"),delete t.removeAces,r.setPolicies(o,c),delete t.policies;var a=t.content;null!=a&&null!=a&&(null!=a.filename&&null!=a.filename||(a.filename=t["cmis:name"]),p.push({multipartData:a,name:t["cmis:name"]}),delete t.content),r.setProperties(o,t),i.push(o)}),delete t.createDocument),null!=t.createFolder&&null!=t.createFolder&&(t.createFolder.forEach(function(t){var o={},r=new e.CmisSession(null),i=t.addAces,s=t.removeAces,c=t.policies;r.setACEs(o,i,"add"),delete t.addAces,r.setACEs(o,s,"remove"),delete t.removeAces,r.setPolicies(o,c),delete t.policies,r.setProperties(o,t),n.push(o)}),delete t.createFolder),null!=t.createPolicy&&null!=t.createPolicy&&(t.createPolicy.forEach(function(t){var o={},r=new e.CmisSession(null),i=t.addAces,n=t.removeAces,c=t.policies;r.setACEs(o,i,"add"),delete t.addAces,r.setACEs(o,n,"remove"),delete t.removeAces,r.setPolicies(o,c),delete t.policies,r.setProperties(o,t),s.push(o)}),delete t.createPolicy),null!=t.createRelationship&&null!=t.createRelationship&&(t.createRelationship.forEach(function(t){var o={},r=new e.CmisSession(null),i=t.addAces,n=t.removeAces,s=t.policies;r.setACEs(o,i,"add"),delete t.addAces,r.setACEs(o,n,"remove"),delete t.removeAces,r.setPolicies(o,s),delete t.policies,r.setProperties(o,t),c.push(o)}),delete t.createRelationship),t.createItem=r,t.createDocument=i,t.createFolder=n,t.createPolicy=s,t.createRelationship=c,this.postForBulk(this.defaultRepository.repositoryUrl,t,p).then(function(t){return t.json()})},t.prototype.bulkUpdate=function(t,o){void 0===o&&(o={});t.cmisaction="bulkupdateprops";var r=new Array;return null!=t.update&&null!=t.update&&(t.update.forEach(function(t){var o={};new e.CmisSession(null).setProperties(o,t),r.push(o)}),delete t.update),t.update=r,this.post(this.defaultRepository.repositoryUrl,t,{content:"default",filename:"default",mimeTypeExtension:"txt"}).then(function(t){return t.json()})},t}();e.CmisSession=c}(e.cmis||(e.cmis={}))}).call(e,o(1))},function(t,e){var o;o=function(){return this}();try{o=o||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(o=window)}t.exports=o},function(e,o){e.exports=t},function(t,o){t.exports=e},function(t,e){t.exports=o},function(t,e){t.exports=r}])});