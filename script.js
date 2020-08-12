$("#moduloResultP").hide();
$("#solve_modulo").click(function(){
  console.log("s");

  let a = $("#aModulo").val();
  let n = $("#mModulo").val();
  let res = a;

  while(a > n){
    a -= n;
  }
  res = a;
  $("#mModuloText").html(n);
  $("#aModuloText").html(a);
  $("#moduloResultText").html(res);
  $("#moduloResultP").show();

})
