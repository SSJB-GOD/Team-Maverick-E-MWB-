package com.Infosys.WellbeingTest.exception;

// Exception for when a test is not found by ID
public class TestNotFoundException extends WellbeingTestException {
    public TestNotFoundException(int id) {
        super("Test with ID " + id + " not found.");
    }
}
