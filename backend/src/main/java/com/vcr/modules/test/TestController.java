package com.vcr.modules.test;

import com.vcr.framework.data.DSMaster;
import com.vcr.framework.data.DSSource1;
import com.vcr.framework.define.DSDefined;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/")
public class TestController {

    @DSMaster
    @GetMapping("test/ds0")
    public String m() {
        return DSDefined.MASTER;
    }

    @DSSource1
    @GetMapping("test/ds1")
    public String s1() {
        return DSDefined.SOURCE1;
    }
}
