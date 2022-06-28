// alert("This is working");

function apiCall(page){
    var limit = parseInt($("input[name='limit']").val());
    var getLimit = parseInt($("#lmt").val());
    if( getLimit ){
        limit = getLimit
        $("input[name='limit']").val(getLimit)
    }
    
    // console.log( `/api/weather-reports?page=${page}&limit=${limit}`)
    $.ajax({
        url: `/api/weather-reports?page=${page}&limit=${limit}`
    }).then(function(data) {
        // console.log(data);
        let html = `
        <tr>
            <th>Location</th>
            <th>Temparature</th>
            <th>Pressure</th>
            <th>Humidity</th>
            <th>Time</th>
        </tr>`
        for (const item of data.result) {
            html += `
                    <tr>
                        <td>${item.state}</td>
                        <td>${item.temp}</td>
                        <td>${item.pressure}</td>
                        <td>${item.humidity}</td>
                        <td>${item.updatedAt}</td>
                    </tr>
                `
        }
        $("#tabledata").html(html)
    });
};

var page = parseInt($("input[name='page']").val());

function next(){
    page += 1;
    $("input[name='page']").val(page);
    apiCall(page);
}
function prev(){
    if(page > 1) page -= 1;
    $("input[name='page']").val(page);
    apiCall(page);
}

$(document).ready(function() {
    apiCall(1, 10)
});