
var reminder=angular.module('reminder',[]);

reminder.controller('mainCtrl',['$scope',function($scope){
    //'#f5811a','#cd74e2','#56e229','#27ace4','#f1c421','#a8875e','#f72c6b'

    $scope.color=['orange','purple','green','blue','yellow','brown','red'];

    $scope.colors=[
        {
            id:1,
            item:'orange',
            itemzi:'新建列表1',
            lei:'il1',
            todos:[
                {
                    id:1,
                    title:'mai che',
                    state:0
                },
                {
                    id:2,
                    title:'maicai',
                    state:1
                },
                {
                    id:3,
                    title:'maifang',
                    state:1
                },
            ]
        },
        {
            id:2,
            item:'purple',
            itemzi:'新建列表2',
            lei:'il2',
            todos:[
                {
                    id:1,
                    title:'qweetr',
                    state:0
                },
                {
                    id:2,
                    title:'qwewetuyy',
                    state:1
                }
            ]
        }

    ];
    $scope.circle=[
        {id: 1,theme:"purple"},
        {id: 2,theme:"green"},
        {id: 3,theme:"blue"},
        {id: 4,theme:"yellow"},
        {id: 5,theme:"brown"},
        {id: 6,theme:"red"},
        {id: 7,theme:"orange"}
    ]
    $scope.cancel=function(){
        $(".card").toggleClass("active")
    }
    $scope.deletecard=function(){
        $(".card").removeClass("active")
    }
    $scope.shanchu=function(dd){
        var newarr=[];
        for(var i=0;i<$scope.colors.length;i++){

            if(Number($scope.colors[i].id) !== dd){
                newarr.push($scope.colors[i]);
            }
        }
        $scope.colors=newarr;
        $scope.current=$scope.colors[0];
    }
    $scope.count=function(){
        var index=0;
        angular.forEach($scope.current.todos,function(v,i){
            if(v.state==1){
                index++;
            }
        })
        return index;
    }
    $scope.change=function(t){
        $scope.current.item = t.theme;
    };
    $scope.current=$scope.colors[0];
    $scope.setcurrent=function(v){
        $scope.current=v;
    };
    console.log($scope.current);
    $scope.delete=function(id){
        $scope.current.todos=$scope.current.todos.filter(function(v,i){
            return v.id!==id;
        })
    };
    $scope.delete1=function(dd){
        var newtodo=[];
        for(var i=0;i<$scope.current.todos.length;i++){
            if(parseInt($scope.current.todos[i].id) !== dd){
                console.log(dd)
                newtodo.push($scope.current.todos[i]);
            }
        }

        $scope.current.todos=newtodo;
    }
    $scope.addtodo=function(){
        var l=$scope.current.todos.length;
        if(l === 0){
            var id=0;
        }else{
            var id=parseInt($scope.current.todos[l-1].id)+1;
        }
        var newtodo={
            id:id,
            title:'',
            state:0
        }
        $scope.current.todos.push(newtodo);
        $scope.currenttodo = newtodo;
    }
    // $scope.addtodos=function(e) {
    //     var max_id = -100;
    //     angular.forEach($scope.current.todos, function (v, i) {
    //         if (v.id > max_id) {
    //             max_id = v.id;
    //         }
    //     });
    //     var index = $scope.arr.length % 7;
    //     var id = max_id + 1;
    //     $scope.current.todos.push({
    //         id: id,
    //         title: $scope.item,
    //         state: 0
    //     });
    //
    // }


    // $scope.addtodos=function(e){
    //     if(e.keyCode==13){
    //         var max_id=0;
    //         angular.forEach($scope.current.todos,function(v,i){
    //             if(max_id<v.id){
    //                 max_id=v.id;
    //             }
    //         })
    //         var item={
    //             id:max_id+1,
    //             title:$scope.item,
    //             state:0,
    //         }
    //         console.log($scope.item);
    //         console.log($scope.current)
    //         $scope.current.todos.push(item);
    //         $scope.item='';
    //     }
    //
    // }

    $scope.add=function(){
        var max_id=0;
        angular.forEach($scope.colors,function(v,i){
            if(max_id<v.id){
                max_id=v.id;
            }
        })
        var item={
            id:max_id+1,
            item:$scope.color[$scope.colors.length%7],
            itemzi:'新建列表'+($scope.colors.length+1),
            lei:'il'+($scope.colors.length%7+1),
            todos:[]
        }
        console.log(item)
        $scope.colors.push(item);
    }
}])
reminder.directive('myDiv',[function(){
    return{
        restrict:'AE',
        transclude:true,
        replace: true,
        template:'<div><div ng-transclude></div></div>',
        link:function(scope,el) {
            $(el).find('ul').on('dblclick','li',function () {
                $(this).addClass('bianji');
                var text = $(this).find('.text').text();
                var input = $(this).find('input');
                input.val(text).focus();
            })
            $(el).find('ul').on('click', 'li', function () {
                $(el).find('ul .active').removeClass('active bianji');
                $(this).addClass('active')
            })


            $('.done-box .anniu .img').on('click',function(){
                $(this).toggleClass('active');
                $(el).find('.yiwan').toggleClass('active')
            })

            $('.new').on('click',function(){
                var li=$('.weiwan li');
                var l=li.length;
                li.removeClass('active');
                li.eq(l-1).addClass('active bianji').find('input').focus();
            })
        }
    }

}]);
reminder.directive('cardList',[function(){
    return{
        restrict:'AE',
        transclude:true,
        replace: true,
        template:'<div><div ng-transclude></div></div>',
        link:function(scope,el){
            $(el).find('.color-box').on('click','.selection-circle',function(){
                $('.selection-circle').removeClass('active');
                $(this).addClass('active')
            })
        }
    }
}]);

reminder.directive('ngColorUl',[function(){
    return {
        restrict:'AE',
        transclude:true,
        template:' <ul class="xinjianitem "><div ng-transclude></div></ul>',
        replace:true,
        link:function(scope,el){
            $(el).on('mousedown',false);
            $(el).find('.item').eq(0).addClass('beijing');
            $(el).on('click','.item',function(){
                $('.item.beijing').removeClass('beijing bianji');
                $(this).addClass('beijing');
            })
            $(el).on('dblclick','.item',function(){
                $('.item').removeClass('bianji');
                $(this).addClass('bianji');
                $(this).find('input').focus();
            });
            $(el).on('keyup',false);
            $(document).on('keyup',function(e){
                if(e.keyCode==8){
                    var id=parseInt($(el).find('.beijing').attr('data-id'));
                    console.log(id);
                    scope.$apply(function(){
                        scope.colors=scope.colors.filter(function(v,i){
                            return v.id!=id;
                        })
                    })
                }
            })

        }
    }
}])


//不用的方法
// reminder.directive('colorItem',[function(){
//     return{
//         restrict:'AE',
//         // templateUrl:'coloritem.html',
//         template:'<li  class="item " data-id="{{col.id}}"> <div class="itemleft {{col.lei}} " ></div> <div class="itemright"> <span> {{col.itemzi}} </span> <input type="text" ng-model="col.itemzi" > <div class="wifi"></div> </div> </li>',
//         replace:true,
//         link:function(scope,el){
//             $(el).on('mousedown',false);
//             // console.log(el);
//             $(el).parent().find('li').eq(0).addClass('beijing');
//             $(el).on('dblclick','.itemright',function(){
//                 // console.log(1)
//                 $('.item').removeClass('bianji');
//                 $(this).closest('li').addClass('bianji');
//                 $(this).find('input').focus();
//             })
//             $(el).on('click','.itemright',function(){
//                 $('.item').removeClass('beijing bianji');
//                 $(this).closest('li').addClass('beijing');
//             })
//             $(el).find('input').on('blur',function(){
//                 $(this).closest('li').removeClass('bianji');
//             })
//             $(document).on('keyup',function(e){
//                 console.log(e.keyCode)
//                 if(e.keyCode==8){
//
//
//                     var id=parseInt($(el).parent().find('.beijing').attr('data-id'));
//                     console.log(id);
//                     scope.$apply(function(){
//                         scope.colors=scope.colors.filter(function(v,i){
//                             return v.id!=id;
//                         })
//                     })
//                 }
//             })
//         }
//     }
// }]);


