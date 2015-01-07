package com.jiradev.jira.plugins.statistic;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.atlassian.jira.plugin.projectpanel.impl.AbstractProjectTabPanel;
import com.atlassian.jira.plugin.projectpanel.ProjectTabPanel;
import com.atlassian.jira.plugin.projectpanel.ProjectTabPanelModuleDescriptor;
import com.atlassian.jira.project.browse.BrowseContext;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.component.ComponentAccessor;

import java.util.Collection;
import java.util.Map;
import java.util.TreeMap;


public class StatisticPanel extends AbstractProjectTabPanel implements ProjectTabPanel
{
    private static final Logger log = LoggerFactory.getLogger(StatisticPanel.class);
    private Project project;

    public Map createVelocityParams (BrowseContext ctx)
    {
        //Get the params object. This will hold all the values that can be accessed in the user-role-project-tab.properties file
        Map params = super.createVelocityParams(ctx);
        
        //Project project = ctx.getProject();
        
    	double[] tab = new double[] { 12, 36, 40, 40, 40, 41, 42, 42, 42,
    			42, 43, 44, 44, 45, 46, 47, 48, 50, 50, 50, 50, 52, 54, 55, 55,
    			56, 60, 60, 62, 63, 63, 64, 65, 65, 65, 65, 68, 70, 70, 73,
    			80, 80, 82, 82, 83, 87, 99 };
    	
    	params.put("max", Statistic.showmax(tab));
    	params.put("min", Statistic.showmin(tab));
    	params.put("avg", Statistic.showavg(tab));
    	params.put("q1", Statistic.Q1(tab));
    	params.put("q2", Statistic.Q2(tab));
    	params.put("q3", Statistic.Q3(tab));
    	params.put("q4", Statistic.Q4(tab));
    	//params.put("q4", project.getName());
        params.put("cols", 3);
        //
        Project project = ctx.getProject();
        params.put("name", project.getName());
        //
        String host = ComponentAccessor.getApplicationProperties().getString("jira.baseurl");
        params.put("host", host);
        return params;
    }
    
    public boolean showPanel(BrowseContext context)
    {
    	Map params = super.createVelocityParams(context);
        return true;
    }
}
