package com.vcr.conf;

import java.util.ArrayList;
import java.util.List;

public interface ProcedureConf {
    List<String> ALLOWED_PROCEDURES = new ArrayList<String>() {
        {
            add("Z_New_Rpt_MasterData");
        }
    };
}
