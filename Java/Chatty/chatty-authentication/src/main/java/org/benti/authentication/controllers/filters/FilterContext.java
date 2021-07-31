package org.benti.authentication.controllers.filters;

import org.benti.authentication.controllers.filters.providers.AuthenticatedFilter;

import javax.ws.rs.container.DynamicFeature;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.FeatureContext;
import javax.ws.rs.ext.Provider;
import java.util.List;

/**
 * @author Alejandro Bentivengo
 * @name FilterContext
 * @date 1/28/2020
 */
@Provider
public class FilterContext implements DynamicFeature {

    private final static List<String> classesToIgnore = List.of("AuthenticationController", "PingController");

    @Override
    public void configure(ResourceInfo resourceInfo, FeatureContext context) {
        if (!classesToIgnore.contains(resourceInfo.getResourceClass().getSimpleName())) {
            context.register(new AuthenticatedFilter());
        }
    }
}
