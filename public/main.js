// alert("This is working");


$(document).ready(function() {
    $.ajax({
        url: "https://newsapi.org/v2/top-headlines?country=us&amp;apiKey=e03753c9126b408d870a44318813ac3d"
    }).then(function(data) {
        
        for (i = 0; i < data.articles.length; i++) {
          $('#tabledata').append("<tr><td>"+data.articles[i].title+"</td></tr>");
        }
        
    });
});