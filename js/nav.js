(function($) { // Begin jQuery
  $(function() { // DOM ready
    $("nav ul li a:not(:only-child)").click(function(e) {
      $(this).siblings(".nav-dropdown").toggle();
      $(".nav-dropdown").not($(this).siblings()).hide();
      e.stopPropagation();
    });
    $("html").click(function() {
      $(".nav-dropdown").hide();
    });
    $("#nav-toggle").click(function() {
      $("nav ul").toggle();
    });
    // Hamburger to X toggle
    document.querySelector("#nav-toggle").addEventListener("click", function() {
      this.classList.toggle("active");
    });
  }); // end DOM ready
})(jQuery); // end jquery