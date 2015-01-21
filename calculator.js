angular.module('calcApp', [])
	.controller('calcController', function($scope, computationService, parseService) {
		$scope.calcInput = '';
		$scope.solution = '';

		$scope.solve = function() {
			var parsedInput = parseService.parse($scope.calcInput);

			if (parsedInput[2] === '+') { 
				var solutionArray = computationService.add(parsedInput[0], parsedInput[1]);
			} else if (parsedInput[2] === '-') {
				var solutionArray = computationService.subtract(parsedInput[0], parsedInput[1]);
			} else if (parsedInput[2] === '*') { 
				var solutionArray = computationService.multiply(parsedInput[0], parsedInput[1]);
			} else if (parsedInput[2] === '/') { 
				var solutionArray = computationService.divide(parsedInput[0], parsedInput[1]);
			}

			if (solutionArray[0] === 0 && solutionArray[1] === 0) {
				$scope.solution = 0;
			} else if (solutionArray[0] === 0) {
				$scope.solution = solutionArray[1];
			} else if (solutionArray[1] === 0) {
				$scope.solution = solutionArray[0];
			} else if (solutionArray[1] < 0) {
				$scope.solution = solutionArray[0] + '-' + solutionArray[1] + 'i';
			} else {
				$scope.solution = solutionArray[0] + '+' + solutionArray[1] + 'i';
			}
		}

	  $scope.addOne = function() {$scope.calcInput += '1';}
	  $scope.addTwo = function() {$scope.calcInput += '2';}
	  $scope.addThree = function() {$scope.calcInput += '3';}
	  $scope.addFour = function() {$scope.calcInput += '4';}
	  $scope.addFive = function() {$scope.calcInput += '5';}
	  $scope.addSix = function() {$scope.calcInput += '6';}
	  $scope.addSeven = function() {$scope.calcInput += '7';}
	  $scope.addEight = function() {$scope.calcInput += '8';}
	  $scope.addNine = function() {$scope.calcInput += '9';}
	  $scope.addZero = function() {$scope.calcInput += '0';}
	  
	  $scope.addDecimal = function() {$scope.calcInput += '.';}
	  $scope.addPlus = function() {$scope.calcInput += '+';}
	  $scope.addMinus = function() {$scope.calcInput += '-';}
	  $scope.addMultiply = function() {$scope.calcInput += '*';}
	  $scope.addDivide = function() {$scope.calcInput += '/';}
	  $scope.addLeftParens = function() {$scope.calcInput += '(';}
	  $scope.addRightParens = function() {$scope.calcInput += ')';}
		$scope.addi = function() {$scope.calcInput += 'i';}

		$scope.addBackspace = function() {
			$scope.calcInput = $scope.calcInput.slice(0, $scope.calcInput.length - 1);
		}

		$scope.clear = function() {
			$scope.calcInput = '';
			$scope.solution = '';
		}
	})
	.service('computationService', function() {
		this.add = function(a, b) {
			return [a[0] + b[0], a[1] + b[1]];
		}
		this.subtract = function(a, b) {
			return [a[0] - b[0], a[1] - b[1]];
		}
		this.multiply = function(a, b) {
			var real = (a[0] * b[0]) - (a[1] * b[1]);
			var imaginary = (a[0] * b[1]) + (a[1] * b[0]);
			return [real, imaginary];
		}
		this.divide = function(a, b) {
			var denominator = Math.pow(b[0], 2) + Math.pow(b[1], 2);
			var real = ((a[0] * b[0]) + (a[1] * b[1])) / denominator;
			var imaginary= ((a[1] * b[0]) - (a[0] * b[1])) / denominator;
			return [real, imaginary];
		}
	})
	.service('parseService', function() {
		this.parse = function(input) {
			var solution = [];
			var segmentOne = input.slice(input.indexOf('(') + 1, input.indexOf(')')).split('+');
			segmentOne[1] = segmentOne[1].slice(0, segmentOne[1].length-1);
			var segmentTwo = input.slice(input.indexOf(')') + 3, input.length-2).split('+');
			var segmentThree = input.slice(input.indexOf(')') + 1, input.indexOf(')') + 2);

			return [segmentOne, segmentTwo, segmentThree]

		}
	})
