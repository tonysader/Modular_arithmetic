
let res = [];
let temp_res,_d,_x,_y,d,x,y;
let ax,bx,nx;

let extended_euclidean = function(a,b){
  if(b==0)
    return [a,1,0];
  temp_res = extended_euclidean(b,parseInt(a%b));
  _d = temp_res[0];
  _x = temp_res[1];
  _y = temp_res[2];
  d = _d;
  x = _y;
  y= _x - ( parseInt(a/b) * _y);
  res.push([a,b,parseInt(a/b),d,x,y]);

  return [d,x,y];

}
let gcd = function(a,b){
	if(b==0)
		return a;
	else return gcd(b,a%b);
}
let prime_together = function(a,b){
	if(gcd(a,b) == 1)
		return true;
	else return false;
}
let eulerPhi = function(a){
	let res = [];
	for(let i=0;i<a;i++){
		if(prime_together(a,i))
			res.push(i);
	}
	return res;
}

let find_modulo = function(a_mm,n_mm){
  let res_mm = a_mm;
  if(a_mm < 0 ){
    while(a_mm < 0){
      a_mm += n_mm;
    }
  }
  while(a_mm > n_mm){
    a_mm -= n_mm;
  }
  res_mm = a_mm;
  return res_mm;
}

$(".gcdRes").hide();
$("#moduloResultP").hide();
$("#calc").click(function(){
	res = [];
	$(".res").remove();
	extended_euclidean($("#a").val(),$("#b").val());
	for(let i=0;i <res.length;i++){
	  let row = '<tr class="res"><td>' + res[i][0] +" </td><td>" + res[i][1] +" </td><td>" + res[i][2] +" </td><td>" + res[i][3] +" </td><td>" + res[i][4] +" </td><td>" + res[i][5] +" </td>  </tr>";
		$(".results").prepend(row);
	}
	$("#gcd").html("(" +res[res.length - 1][0] + " * " + res[res.length - 1][4] +  ") + (" +res[res.length - 1][1] + "*" + res[res.length - 1][5]+ ")  = " +  gcd($("#a").val(),$("#b").val()));
	$(".gcdRes").show();
});

$("#e").keyup(function(){
	let val = $(this).val();
	$("#eVal").html(val);
	let results = eulerPhi(val);
	$("#eulerResultLength").html(results.length);
	$("#eulerResult").html(results.join(", "));
})


$("#solve_modulo").click(function(){

  let a_mm = parseInt($("#aModulo").val());
  let original_a = a_mm;
  let n_mm = parseInt($("#mModulo").val());

  res_mm = find_modulo(a_mm,n_mm);
  $("#mModuloText").html(n_mm);
  $("#aModuloText").html(original_a);
  $("#moduloResultText").html(res_mm);
  $("#moduloResultP").show();

})
$("#try18_4").click(function(){

    let a_mm = 18 ;
    let original_a = a_mm;
    let n_mm = 4;
    let res_mm = a_mm;
    $("#aModulo").val(a_mm);
    $("#mModulo").val(n_mm);
    res_mm = find_modulo(a_mm,n_mm);
    $("#mModuloText").html(n_mm);
    $("#aModuloText").html(original_a);
    $("#moduloResultText").html(res_mm);
    $("#moduloResultP").show();

})


$("#ax").keyup(function(){
	$("#axText").html($(this).val());
	ax = $(this).val();
})

$("#bx").keyup(function(){
	$("#bxText").html($(this).val());
	bx = $(this).val();
})
$("#nx").keyup(function(){
	$("#nxText").html($(this).val());
	nx = $(this).val();
})
$("#solve").click(function(){
	let a = ax;
	let b = bx;
	let n = nx;
	let gcd_ext = extended_euclidean(a,n);
	let d,x2,y2,x0;
	let results = [];
	d = gcd_ext[0]; x2 = gcd_ext[1]; y2 = gcd_ext[2];

	if(b%d == 0){
		x0= (x2 * (b/d) ) % n;
		while(x0 < 0){
			x0 += n;
		}
		for(let i=0;i< d-1;i++){
			results.push((x0 + i*(n/d)) % n);
		}
	}
	if(results.length==0){
		$("#equations_results").html("No results");
	}else{
		$("#equations_results").html(results.join(", "));
	}
	$(".equ_res_wrapper").show();

})

let is_prime = function(number){
	 for (let i = 2; i < number; i++) {
        if (number % i == 0 && i != number) return false;
    }
    return true;
}
$("#prime_start").val(2);
$("#prime_end").val(50);
let primes = [];
for(let i=2; i<=50;i++){
	if(is_prime(i)){
		primes.push(i);
	}
}
primes.forEach(function(item){
	$(".primes_flex").append('<div class="prime_num"> ' +item+ "</div>");
});

$("#show_prime").click(function(){
	$(".prime_num").remove();
	primes = [];
	let s = parseInt($("#prime_start").val());
	let e = parseInt($("#prime_end").val());
	if(s < 2){
		$("#prime_start").val(2);
		s=2;
	}
	for(let i=s; i<=e;i++){
		if(is_prime(i)){
			primes.push(i);
		}
	}
	primes.forEach(function(item){
		$(".primes_flex").append('<div class="prime_num"> ' +item+ "</div>");
	});

})

$("#show_powers").click(function(){
  let n = $("#power_n").val();
  let i = $("#power_i").val();
  $("#power_i_txt").html(i);
  $("#power_n_txt").html(n);
  for(let j =0;j<10;j++){
      $("#pwr_row_1").append("<tr> " +j + " </td>");
      $("#pwr_row_2").append("<tr> " +find_modulo(Math.pow(i,j) ,n) + " </td>");
  }
})


//default power table
let n_p = 7;
let i_p = 3;

$("#power_i").val(i_p);
$("#power_n").val(n_p);
$("#power_i_txt").html(i_p);
$("#power_n_txt").html(n_p);
for(let j =0;j<10;j++){
    $("#pwr_row_1").append("<td> " + j + " </td>");
    $("#pwr_row_2").append("<td> " +find_modulo(Math.pow(i_p,j) ,n_p) + " </td>");
}
