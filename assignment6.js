$(document).ready(function() {
    $.getJSON("warframes.JSON", function(data) {

        data.warframes.forEach(function(wf) {
            $("#wfTable").append(`
                <tr>
                    <td>${wf.name}</td>
                    <td>${wf.rank}</td>
                    <td>${wf.hp}</td>
                    <td>${wf.shield}</td>
                    <td>${wf.armor}</td>
                    <td>${wf.energy}</td>
                    <td>${wf.sprint}</td>
                </tr>
            `);
        });

    });
});
