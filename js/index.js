var app = angular.module('app', ['ngMaterial','angularGrid']);

app.controller('MainCtrl', ['$scope', '$timeout', function($scope, $timeout) {
  var vm = this;
  vm.mobileProducts = [];
  vm.desktopProducts = [];

  var storeCounts = {}, breed;
  var mobileProductList = [];
  var desktopProductList = [];

// Parse back4app Initialize
  Parse.initialize("vP79sdltVqIv08jXCdIM05Y0o3qk6OEpwHwtTGCX", "vsUGF5AHQjnalQBGgnfRYgdZQOmKWFfVVuj9blv1");
  Parse.serverURL = 'https://parseapi.back4app.com';

// Select Image Table
  var Images = Parse.Object.extend("Images");
  var query = new Parse.Query(Images);

// Get Rows
  query.descending("likes");
  query.limit(1000);
  query.find()
    .then(function(results) {
      // Split rows by breed
      for (var i = 0; i < results.length; i++) {
        breed = results[i].get('breed');

        if (!storeCounts[breed]) {
          storeCounts[breed] = [];
            storeCounts[breed].push(results[i]);
        }

        storeCounts[breed].push(results[i]);
      }

      // Select highest voted images and write it to local variable
      var storeInfo, productImage, productImageUrl, likes, count = 0;
      angular.forEach(storeCounts, function(value, key) {
        storeInfo = storeCounts[key];
        breed = storeInfo[0].get('breed');
        likes = storeInfo[0].get('likes');
        productImage = storeInfo[0].get("imageFile");
        productImageUrl = productImage.url();
        if (count++ % 3 == 0) {
          mobileProductList.push([{ breed: breed, image: productImageUrl, likes: likes }]);
        }
        else {
          mobileProductList[mobileProductList.length - 1].push({ breed: breed, image: productImageUrl, likes: likes });
        }

        desktopProductList.push({ breed: breed, image: productImageUrl, likes: likes });
      })
      $timeout(function () { vm.mobileProducts = angular.copy(mobileProductList);vm.desktopProducts = angular.copy(desktopProductList); }, 1e3);
    })
    .catch(function(err) {
      $scope.error = err;
    });

}]);
app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
