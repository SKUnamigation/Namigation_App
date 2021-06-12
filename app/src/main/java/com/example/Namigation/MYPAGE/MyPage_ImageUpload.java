package com.example.Namigation.MYPAGE;

import com.android.volley.AuthFailureError;
import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;

import java.util.HashMap;
import java.util.Map;

public class MyPage_ImageUpload extends StringRequest{

    // 서버 URL 설정 ( PHP 파일 연동 )
    final static private String URL = "";
    private Map<String, String> map;


    public MyPage_ImageUpload(int usernum, String imageFileName, Response.Listener<String> listener) {
        super(Method.POST, URL, listener, null);

        map = new HashMap<>();
        map.put("usernum", String.valueOf(usernum));
        map.put("imageFileName", imageFileName);

    }

    @Override
    protected Map<String, String> getParams() throws AuthFailureError {
        return map;
    }

}