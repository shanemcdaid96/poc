angular.module('todoController', [])


	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Patient) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all patients and show them
		// use the service to get all the patients
		Patient.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		$scope.createPatient = function() {

			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Patient.create($scope.formData)

					
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of patients
					});
			}
		};

		// DELETE ==================================================================
		// delete a patient after checking it
		$scope.deletePatient = function(id) {
			$scope.loading = true;

			Patient.delete(id)
			
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of patients
				});
		};
	}]);