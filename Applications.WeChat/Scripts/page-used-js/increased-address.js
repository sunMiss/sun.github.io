function addAddress(){
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_USER_ADD_SHOPPING_ADDRESS,    //请求的url地址
        dataType: "json",   //返回格式为json
        /*{
         "Receiver": "sample string 1",
         "ContactNumber": "sample string 2",
         "MobilePhone": "sample string 3",
         "ProvinceId": "1c16d6a4-a19a-403c-b8ed-9088074a6c2a",
         "Province": "sample string 5",
         "CityId": "8ac2c6ec-2fa7-43bf-8b7d-6eea12801d3f",
         "City": "sample string 7",
         "CountyId": "794b1880-41ce-4e94-b262-a947f6e4f4c4",
         "County": "sample string 9",
         "Street": "sample string 10",
         "ZipCode": "sample string 11",
         "IsDefault": true
         }*/
        contentType: "text/json",
        data: "{'Receiver': '胡洁', " +
        "'ContactNumber': '08322508072', " +
        "'MobilePhone': '18781998973'," +
        "'ProvinceId': '122', " +
        "'Province': '四川省', " +
        "'CityId': 333, " +
        "'City': 成都市, " +
        "'CountyId': 444, " +
        "'County': 青羊区, " +
        "'Street': 苏坡中路, " +
        "'ZipCode': 640016, " +
        "'IsDefault': true}",
        type: "POST",
        headers: {
            'Authorization':'FSMuqEIe9ojeViyajgPlbg42oEQ44C8szfTOhE4owvYITS88ohGMPpdkldLCkMA56ePcMm9Px7CO3SLVt3wc7PLfpJILofcKu62i5_qbMHay17kIi6gnqsgHQ4u2aAtFlATkc4rk1ee53hnrZnHjE1HLS_vW4ETMmbgvlU'
        },
       /* beforeSend:function(request){
            request.setRequestHeader("Authorization","FSMuqEIe9ojeViyajgPlbg42oEQ44C8szfTOhE4owvYITS88ohGMPpdkldLCkMA56ePcMm9Px7CO3SLVt3wc7PLfpJILofcKu62i5_qbMHay17kIi6gnqsgHQ4u2aAtFlATkc4rk1ee53hnrZnHjE1HLS_vW4ETMmbgvlU");
        }*/
    })
}
