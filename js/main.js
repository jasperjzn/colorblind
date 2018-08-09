var level=8;
var two_d_array=[];
var cell_height = 0;


function Color(r, g, b){
  this.r = r;
  this.g = g;
  this.b = b;
}


function color_to_html(color){
  return "rgb("+color.r+","+color.g+","+color.b+")";
}

var base_color = new Color(148, 0, 211);
var secret_color = new Color(186, 85, 211);
two_d_array=[];


set_up_two_d_array_and_colors(level);
set_up_battleground();

function set_up_two_d_array_and_colors(lvl){
  var the_one = Math.floor(Math.random() * (parseInt(lvl)+2) * (parseInt(lvl)+2));
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
}

console.log(2000/(parseInt(level)+2));

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
      btn.setAttribute("style","border:none; outline:none; width:100%;height:100%;padding:0px 0px");
      btn.style.backgroundColor = (two_d_array[i][j]==0) ? color_to_html(base_color) : color_to_html(secret_color);
      cell.style.backgroundColor = (two_d_array[i][j]==0) ? color_to_html(base_color) : color_to_html(secret_color);
      var block_height = 900/(parseInt(level)+2).toString()+"px";
      cell.style.height=block_height;
      cell.appendChild(btn);

    }
  }
}

function cell_clicked(kl){
  console.log(kl.getAttribute("i_index"));
  console.log(kl.getAttribute("j_index"));
}

// $("#table_name").on("click-cell.bs.table", function (field, value, row, $el) {
//     if (value !="column_name"){
//       console.log("hit");
//     }
//  });
