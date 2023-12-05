/*
Created by grayson cummins
2023
 */
package org.example.models;

import java.util.List;

public class CollegeApiResponse {
    private Metadata metadata;
    private List<College> results;

    public Metadata getMetadata() {
        return metadata;
    }

    public void setMetadata(Metadata metadata) {
        this.metadata = metadata;
    }

    public List<College> getResults() {
        return results;
    }

    public void setResults(List<College> results) {
        this.results = results;
    }
}

class Metadata {
    private int total;
    private int page;
    private int per_page;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPerPage() {
        return per_page;
    }

    public void setPerPage(int per_page) {
        this.per_page = per_page;
    }
}