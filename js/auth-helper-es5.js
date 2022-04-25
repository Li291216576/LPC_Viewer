var AuthHelper = /** @class */ (function() {
    function AuthHelper() {}

    AuthHelper.getAccessToken = function(callback) {
        //var url = 'http://127.0.0.1:8200/auth/dev/token';
        var url = "https://api.cloud.pkpm.cn/bimserver/auth/oauth/token";
        
        var data = "client_id=42RM9m14pjB62YyWC81ziEIY&client_secret=42RM9n14pjB62YyeaU1pq06H&grant_type=client_credentials";
        
        var xhr = new XMLHttpRequest(); // no arguments
        xhr.withCredentials=true;

        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
        //alert(this.response);

        xhr.onload = function() {
            //alert("onload");
            // 回调函数的参数为 Access Token 和 有效期周期
            //alert(this.responseText);
            var response = JSON.parse(this.response);
//            alert(response.access_token);
            callback(response.access_token, response.expires_in);
        };

        xhr.onerror = function(err) {
            console.error(err);
        };
    };

    return AuthHelper;
})();
