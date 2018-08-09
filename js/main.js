var level=0;
var two_d_array=[];

function Color(r, g, b){
  this.r = r;
  this.g = g;
  this.b = b;
}


function color_to_html(color){
  return "rgb("+color.r+","+color.g+","+color.b+")";
}

var base_color = new Color(0, 0, 0);
var secret_color = new Color(0, 0, 0);
two_d_array=[];
set_up_two_d_array_and_colors(level);
set_up_battleground();

function set_up_two_d_array_and_colors(lvl){
  var the_one = Math.floor(Math.random() * (parseInt(lvl)+2) * (parseInt(lvl)+2));
  console.log(the_one);
  var i = Math.floor(the_one / (parseInt(lvl) + 2));
  var j = the_one % (parseInt(lvl) + 2);
  for (var t=0;t<parseInt(lvl)+2;t++){
    var local_lst = [];
    for (var q=0;q<parseInt(lvl)+2;q++){
      if (t==i && q==j){
        local_lst.push(1);
      }else{
        local_lst.push(0);
      }
    }
    two_d_array.push(local_lst);
  }
  base_color = new Color(Math.floor(Math.random()*Math.floor(256)), Math.floor(Math.random()*Math.floor(256)), Math.floor(Math.random()*Math.floor(256)));

  var level_offset = Math.floor(200/(level+2)+50);
  // var r_offset = Math.floor(Math.random()*(level_offset));
  // var g_offset = Math.floor(Math.random()*(level_offset-r_offset));
  var r_offset = Math.floor(level_offset/3);
  var g_offset = Math.floor(level_offset/3);
  var b_offset = level_offset - r_offset - g_offset;
  var rng = Math.floor(Math.random()*Math.floor(2));
  var secret_r,secret_g,secret_b;
  if(rng){
    secret_r = ((base_color.r+r_offset)>255)? (base_color.r+r_offset) : (base_color.r-r_offset)
    secret_g = ((base_color.g+g_offset)>255)? (base_color.g+g_offset) : (base_color.g-g_offset)
    secret_b = ((base_color.b+b_offset)>255)? (base_color.b+b_offset) : (base_color.b-b_offset)
  }else{
    secret_r = ((base_color.r-r_offset)<0)? (base_color.r-r_offset) : (base_color.r+r_offset)
    secret_g = ((base_color.g-g_offset)>255)? (base_color.g-g_offset) : (base_color.g+g_offset)
    secret_b = ((base_color.b-b_offset)>255)? (base_color.b-b_offset) : (base_color.b+b_offset)
  }
  secret_color = new Color(secret_r,secret_g,secret_b);
}

function set_up_battleground(){
  var tableRef = document.getElementById('table_name');
  for (var i=0; i<two_d_array.length;i++){
    var newRow = tableRef.insertRow(tableRef.rows.length);
    for (var j=0;j<two_d_array[i].length;j++){
      var cell  = newRow.insertCell(j);
      var btn = document.createElement("BUTTON");
      btn.setAttribute("onclick","cell_clicked(this)");
      btn.setAttribute("i_index",i);
      btn.setAttribute("j_index",j);
      btn.setAttribute("isAnswer", two_d_array[i][j]);
      btn.setAttribute("style","border:none; outline:none; width:100%;height:100%;padding:0px 0px");
      btn.style.backgroundColor = (two_d_array[i][j]==0) ? color_to_html(base_color) : color_to_html(secret_color);
      cell.style.backgroundColor = (two_d_array[i][j]==0) ? color_to_html(base_color) : color_to_html(secret_color);
      var block_height = 900/(parseInt(level)+2).toString()+"px";
      cell.style.height=block_height;
      cell.appendChild(btn);
    }
  }
}

function cell_clicked(elem){
  if(elem.getAttribute("isAnswer")==1){
    if(level==15){
      $("#done").modal();
      return;
    }
    clear_battleground();
    two_d_array=[]
    level++;
    set_up_two_d_array_and_colors(level);
    set_up_battleground();
  }else{
    //nothing
  }
}

function clear_battleground(){
  var node = document.getElementById("table_name")
  while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
  }
}
