package com.eKirana.SharedLibrary.utilities;

import com.eKirana.SharedLibrary.exceptionHandling.eKiranaInternalError;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class CommonUtils {
    public static ResponseEntity<?> get500ResponseEntity(@NotNull Exception ex) {
        return new ResponseEntity<>(new eKiranaInternalError(ex), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
