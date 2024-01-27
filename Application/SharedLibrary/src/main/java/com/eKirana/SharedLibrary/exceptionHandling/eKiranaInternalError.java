package com.eKirana.SharedLibrary.exceptionHandling;

import org.jetbrains.annotations.NotNull;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class eKiranaInternalError implements Serializable {
    private final int STACK_DEPTH = 5;
    private String description;
    private List<String> stackTrace;

    public eKiranaInternalError() {
    }

    public eKiranaInternalError(String type, List<String> stackTrace) {
        this.description = type;
        this.stackTrace = stackTrace;
    }

    public eKiranaInternalError(@NotNull Exception ex) {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getStackTrace() {
        return stackTrace;
    }

    public void setStackTrace(List<String> stackTrace) {
        this.stackTrace = stackTrace;
    }

    @Override
    public String toString() {
        return "eKiranaInternalError{" +
                "description='" + description + '\'' +
                ", stackTrace=" + stackTrace +
                '}';
    }
}
