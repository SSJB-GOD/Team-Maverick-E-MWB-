package com.Infosys.WellbeingTest.exception;

// Exception for invalid input data
public class InvalidTestInputException extends WellbeingTestException {
    public InvalidTestInputException(String message) {
        super("Invalid input: " + message);
    }
}
