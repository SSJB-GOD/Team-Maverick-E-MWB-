package com.Infosys.WellbeingTest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Field;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Choice {
    @Field("option")
    private String option;


    @Field("score")
    private int score;
}
