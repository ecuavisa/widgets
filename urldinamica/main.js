var principalSheet = 'https://docs.google.com/spreadsheets/d/1WuFJExybnScDz6aZgyETSTHpfwWU9ZHKuP8zSpbMNvk/edit#gid=0';

sheetrock({
    url: principalSheet,
    query: "select A",
    fetchSize: 500,
    callback: function (data, sheetrock, response) {
        console.log(response);
        let rows = response.raw.table.rows;
        console.log(rows);
        let url = rows[0].c[0].v;
        console.log(url);
    }
});

