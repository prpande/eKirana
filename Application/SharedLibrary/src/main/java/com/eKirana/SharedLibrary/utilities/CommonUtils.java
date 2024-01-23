package com.eKirana.SharedLibrary.utilities;

import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class CommonUtils {
    public static ResponseEntity<String> get500ResponseEntity(@NotNull Exception ex) {
        return new ResponseEntity<>(ex.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
