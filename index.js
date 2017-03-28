/*
 * Created by Home on 3/25/2017.
 */
var module = angular.module("myApp", [])

module.controller("myCtrl", function ($scope) {
    $scope.arry = getStorageList();
    $scope.createTr = createTr;
    $scope.remove = removeItem;
    $scope.searchNumber = searchNum;
    $scope.checkNetwork = checkNetwork;
    $scope.selectedNetwork = 'allNetwork';


    function createTr() {
            //If cell Number Or Rs is undefined then return;
        if(!$scope.cellNo|| !$scope.rs ) return;

            //Push the values of cell number and Rs in main item list
        $scope.arry.push({'cellNo': $scope.cellNo, 'rs': $scope.rs, 'date': new Date().toString()});
        console.log( $scope.arry)
        setListInStorage($scope.arry);

            //After adding fields, empty the input fields
        emptyField();
    }
            //search number from given numbers
    function searchNum(value){
        if(!value) return;
            for(var i=0; i< $scope.arry.length; i++){
                if( $scope.arry[i].cellNo.indexOf(value) != -1 ){
                    $scope.arry[i].isHide = false;
                }
                else{
                    $scope.arry[i].isHide = true;
                }
            }
    }
    var networkHash = {
        'telenor': ["0342","0343","0344","0345","0346","0347"],
        'zong': ["0311", "0312", "0313", "0314", "0315", "0316"],
        'jazz': ["0300", "0301", "0302", "0303", "0304", "0305", "0306", "0307", "0308", "0309"],
        'ufone' : ["0331", "0332", "0333", "0334", "0335", "0336"]
    }

    function compare(array, cellNo){
        return array.some(function(elem){ return elem == cellNo})
    }

        // selected  Network
    function checkNetwork(value){
        console.log(value);
        for(var i=0; i< $scope.arry.length; i++){
            var cellNo = $scope.arry[i].cellNo.slice(0,4);
            if(!networkHash[value] || compare(networkHash[value],cellNo)){
                $scope.arry[i].isHide = false;
            }
            else {
                $scope.arry[i].isHide = true;
            }
        }
    }

            //get list items from  storage
    function getStorageList(){
        var list = localStorage.getItem("list");
        if(list){
            list = JSON.parse(list);
            //list.forEach(function(item){
            //    //delete item.$$hashKey
            //    item.date = new Date(item.date);
            //})
            return list;
        }
        return [];
    }

              //set list items to local storage
    function setListInStorage(list){
        localStorage.setItem("list",JSON.stringify(list))
    }
             //Remove item from list
    function removeItem(index){
        $scope.arry.splice(index, 1);
        setListInStorage($scope.arry);
    }

    function emptyField() {
        $scope.cellNo = "";
        $scope.rs = "";
    }
})
