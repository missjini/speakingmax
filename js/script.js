$(document).ready(function () {
  LnbMenu();
  tableChecked();

  // editor 정보 : https://alex-d.github.io/Trumbowyg/demos/#plugins-upload
  if ($('#editor').length > 0) {
    $('#editor').trumbowyg({
      btns: [
        ['undo', 'redo'], // Only supported in Blink browsers
        ['strong', 'em', 'del'],
        ['superscript', 'subscript'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        ['viewHTML'],
        ['upload']
      ],
      plugins: {
        upload: {}
      }
    });
    $.trumbowyg.svgPath = false; // Icon svg 해제 : body안에 직접 호출
  }
});

function LnbMenu() {
  // .angle-left 클릭 이벤트
  document.querySelector('.angle-left').addEventListener('click', function () {
    document.body.classList.add('menu_hide');
  });

  // .menu-burger 클릭 이벤트
  document.querySelector('.menu-burger').addEventListener('click', function () {
    document.body.classList.remove('menu_hide');
  });

  // 메뉴 아이템을 클릭할 때
  $(".menu_inner > li > a").click(function (e) {
    e.preventDefault(); // 기본 이벤트 방지

    var $parentMenuItem = $(this).parent(); // 클릭된 메뉴 아이템의 부모
    var $submenu = $parentMenuItem.find(".menu_sub"); // 해당 메뉴 아이템의 하위 메뉴

    if ($parentMenuItem.hasClass("active")) {
      // 만약 이미 active 클래스가 적용된 메뉴 아이템을 클릭한 경우
      $submenu.removeClass("active").slideUp(); // 하위 메뉴 숨기기
      $parentMenuItem.removeClass("active"); // active 클래스 제거
    } else {
      // active 클래스가 없는 경우
      // 모든 .menu_sub 숨기기
      $(".menu_sub").removeClass("active").slideUp();
      // 모든 .menu_inner > li에서 active 클래스 제거
      $(".menu_inner > li").removeClass("active");

      // 클릭된 메뉴 아이템에 대한 처리
      $submenu.addClass("active").slideDown(); // 하위 메뉴를 보여주기
      $parentMenuItem.addClass("active"); // 클릭된 메뉴 아이템에 active 클래스 추가
    }
  });

  // 하위 메뉴 아이템을 클릭할 때
  $(".sub_inner > li > a").click(function (e) {
    e.preventDefault(); // 기본 이벤트 방지

    // 모든 sub_inner li에서 active 클래스 제거
    $(".sub_inner li").removeClass("active");

    // 클릭된 하위 메뉴 아이템에 active 클래스 추가
    $(this).parent().addClass("active");
  });

  // .menu_inner > li.active > a 를 클릭할 때
  $(".menu_inner > li.active > a").click(function (e) {
    e.preventDefault(); // 기본 이벤트 방지

    var $parentMenuItem = $(this).parent(); // 클릭된 메뉴 아이템의 부모
    var $submenu = $parentMenuItem.find(".menu_sub"); // 해당 메뉴 아이템의 하위 메뉴

    // 하위 메뉴 숨기고 active 클래스 제거
    $submenu.removeClass("active").slideUp();
    $parentMenuItem.removeClass("active");
  });
}

function tableChecked() {
  // th 안의 checkbox를 클릭할 때
  $('th input[type="checkbox"]').click(function () {
    var isChecked = $(this).prop("checked"); // 체크박스의 현재 상태

    // tbody 내의 각 체크박스 상태를 변경하고 tr에 active 클래스를 추가 또는 제거
    $('tbody input[type="checkbox"]').each(function () {
      $(this).prop("checked", isChecked); // th의 체크박스 상태에 따라 변경
      if (isChecked) {
        $(this).closest("tr").addClass("active"); // 체크된 경우 active 클래스 추가
      } else {
        $(this).closest("tr").removeClass("active"); // 체크 해제된 경우 active 클래스 제거
      }
    });
  });

  // tbody 안의 체크박스를 클릭할 때
  $('tbody input[type="checkbox"]').click(function () {
    var isChecked = $(this).prop("checked"); // 클릭된 체크박스의 상태

    if (isChecked) {
      $(this).closest("tr").addClass("active"); // 체크된 경우 active 클래스 추가
    } else {
      $(this).closest("tr").removeClass("active"); // 체크 해제된 경우 active 클래스 제거
    }
  });

  function popupMenu() {
    // .menu_inner > li.active > a 를 클릭할 때
    $(".popup_title_menu > li").click(function (e) {
      e.preventDefault(); // 기본 이벤트 방지

      var $selectMenuItem = $(this); // 클릭된 메뉴 아이템의 부모

      if (!$selectMenuItem.hasClass("active")) {
        // 만약 이미 active 클래스가 적용된 메뉴 아이템을 클릭한 경우
        $submenu.removeClass("active").slideUp(); // 하위 메뉴 숨기기
        $parentMenuItem.removeClass("active"); // active 클래스 제거
      } else {
        // active 클래스가 없는 경우
        $(".menu_inner > li").removeClass("active");

        // 클릭된 메뉴 아이템에 대한 처리
        $submenu.addClass("active").slideDown(); // 하위 메뉴를 보여주기
        $parentMenuItem.addClass("active"); // 클릭된 메뉴 아이템에 active 클래스 추가
      }
    });
  }
}
