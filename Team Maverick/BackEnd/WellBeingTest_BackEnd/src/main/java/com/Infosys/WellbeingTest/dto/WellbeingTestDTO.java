package com.Infosys.WellbeingTest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WellbeingTestDTO {

    private int userId;
    private Map<String, String> responses;

}
