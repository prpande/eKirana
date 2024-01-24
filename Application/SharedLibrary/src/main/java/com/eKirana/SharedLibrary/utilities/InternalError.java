package com.eKirana.SharedLibrary.utilities;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

public class InternalError {
    private final int STACK_DEPTH = 5;
    private String description;
    private List<String> stackTrace;

    public InternalError() {
    }

    public InternalError(String type, List<String> stackTrace) {
        this.description = type;
        this.stackTrace = stackTrace;
    }

    public InternalError(@NotNull Exception ex) {
        this.description = ex.toString();
        stackTrace = new ArrayList<>();

        int depth = 0;
        for(StackTraceElement ste : ex.getStackTrace()) {
            if (depth == STACK_DEPTH) {
                break;
            }
            stackTrace.add(ste.toString());
            depth++;
        }
    }

    @Override
    public String toString() {
        return "InternalError{" +
                "description='" + description + '\'' +
                ", stackTrace=" + stackTrace +
                '}';
    }
}
