$(document).ready(function(){
    //get API
   var JsonTable = "https://jkq0dchnp0.execute-api.eu-west-1.amazonaws.com/dev/get-json-data"
  
    $.getJSON( JsonTable, function( data ) {
            console.log(data)

    //display the table's items
    $(data.products).each(function(i, value) {
        $('#Table_body').append($ ('<tr>')

        .append($('<td>').append(value.id))
        .append($('<td>').append(value.title))
        .append($('<td>').append(value.product_type))
        .append($('<td>').append(value.created_at))
        .append($('<td>').append(value.published_at))
        .append($('<td>').append(value.handle))
        .append($('<td>').append(value.updated_at)))
       
    });

        //sorting 
        const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

        const compare = (idx, asc) => (a, b) => ((v1, v2) => 
            v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
            )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
        
    
         //sort the values by clicking the header   
            document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
                const table = th.closest('table');
                const tbody = table.querySelector('tbody');
                Array.from(tbody.querySelectorAll('tr'))
                  .sort(compare(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
                  .forEach(tr => tbody.appendChild(tr) );
        })));
        
    });
});