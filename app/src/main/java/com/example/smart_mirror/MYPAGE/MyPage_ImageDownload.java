package com.example.smart_mirror.MYPAGE;

import com.android.volley.AuthFailureError;
import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;

import java.util.HashMap;
import java.util.Map;

public class MyPage_ImageDownload extends StringRequest {

    // 서버 URL 설정 ( PHP 파일 연동 )
    final static private String URL = "http://3.34.199.62/Select_ProfileImg.php";
    private Map<String, String> map;


    public MyPage_ImageDownload(int usernum, Response.Listener<String> listener) {
        super(Method.POST, URL, listener, null);

        map = new HashMap<>();
        map.put("userNum", String.valueOf(usernum));

    }

    @Override
    protected Map<String, String> getParams() throws AuthFailureError {
        return map;
    }
}