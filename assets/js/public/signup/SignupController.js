angular.module('SignupModule').controller('SignupController', ['$scope', '$http', function($scope, $http){

  // Setup loading state
  $scope.signupForm = {
    loading: false
  }

  $scope.submitSignupForm = function() {
    $scope.signupForm.loading = true;

    $http.post('/signup', {
      name: $scope.signupForm.name,
      title: $scope.signupForm.title,
      email: $scope.signupForm.email,
      password: $scope.signupForm.password
    })
    .then(function onSuccess(){
      window.locaiton = '/user'
    })
    .catch(function onError(sailsResponse){
      console.log(sailsResponse);
    });
  }
}]);
