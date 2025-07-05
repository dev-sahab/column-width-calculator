$(document).ready(function () {
  // Add new column input
  $("#addColumn").click(function () {
    $("#columnsContainer").append(`
          <div class="d-flex column-input">
            <input type="number" class="form-control columnWidth" placeholder="e.g., 400">
            <button class="btn btn-danger ms-2 removeColumn">−</button>
          </div>
        `);
  });

  // Remove column input
  $(document).on("click", ".removeColumn", function () {
    if ($(".columnWidth").length > 1) {
      $(this).closest(".column-input").remove();
    }
  });

  // Calculate button
  $("#calculate").click(function () {
    let container = parseFloat($("#containerWidth").val());
    let gap = parseFloat($("#gapWidth").val());
    let available = container - gap;

    if (isNaN(container) || isNaN(gap) || available <= 0) {
      $("#result").html(
        `<span class="text-danger">Please enter valid container and gap values.</span>`
      );
      return;
    }

    let output = "";
    let totalUsed = 0;
    $(".columnWidth").each(function (index) {
      let colWidth = parseFloat($(this).val());
      if (isNaN(colWidth) || colWidth <= 0) return;

      let percent = ((colWidth / available) * 100).toFixed(2);
      output += `Column ${index + 1}: ${percent}%<br>`;
      totalUsed += colWidth;
    });

    let unused = available - totalUsed;
    if (unused < 0) {
      output += `<span class="text-danger">Total column width exceeds available width!</span>`;
    } else {
      output += `<span class="text-muted">Unused width: ${unused}px</span>`;
    }

    $("#result").html(output);
  });
});
