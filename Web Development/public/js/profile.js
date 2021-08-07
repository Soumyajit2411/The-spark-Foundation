$("#show").on("click", function () {
  $("#show1").show();
  $(".center").show();
  $(".back-img").toggleClass("blur");
  $(this).hide();
});

$("#close").on("click", function () {
  $(".center").hide();
  $("#show").show();
  $(".back-img").removeClass("blur");
});
$("#show1").on("click", function () {
  $(".center1").show();
  $(".center").hide();
  $(this).hide();
});

$("#close1").on("click", function () {
  $(".center1").hide();
  $(".center").hide();
  $("#show").show();
  $(".back-img").removeClass("blur");
});
