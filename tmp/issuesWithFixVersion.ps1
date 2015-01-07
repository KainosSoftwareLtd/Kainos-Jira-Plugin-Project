
$username = "user"
$password = "pass"

$startAt = 0
$maxRecords = 50

$statusItems = @()

do {

$url = 'https://kainossmart.atlassian.net/rest/api/2/search?jql=project%3D"Kainos Smart" AND fixVersion > "Smart v4.3.01" AND fixVersion < "Smart v5" AND type not in subTaskIssueTypes() and "Epic Link" not in (KS-662, KS-3281)&startAt=' + $startAt
$url
#$json

#get all issues


$response = Invoke-RestMethod -Uri ($url) -Headers @{"Authorization" = "Basic "+[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($username+":"+$password ))} -Method GET 
$response
$issues = $response.issues
#$issues


#iterate through issues





foreach($issue in $issues)
{
    #expand changelog
    #$issue.self
    
    $url = $issue.self + "?expand=changelog"
    $url
    
    $json = invoke-expression ("curl -ss -u robert.krasinski:123456 -X GET -H 'Content-Type: application/json' --insecure " + $url)
    $changelog = ($json | ConvertFrom-Json)
    

    #iterate through change log
    # find status changes and add dates to object
    # issue, from, to, who

    foreach($history in $changelog.changelog.histories)
    {
        
        $statusElement = $history.items | ? {$_.field -eq 'status'}
        if($statusElement)
        {
            #$statusElement
            #$issue.fields.fixVersions[-1].name
            #$issue.fields.components[0].name
            

            $changeStatusItem = New-Object PSObject -Property @{
                key = $issue.key
                #component = $issue.fields.components.name
                date = $history.created
                fromStatus = $statuselement.fromString
                toStatus = $statusElement.toString
                author = $history.author.name
                fixVersion = $issue.fields.fixVersions[-1].name
                component = $issue.fields.components[0].name
            }

            #$changeStatusItem

            $statusItems += $changeStatusItem
            
        }
    }
    $issue.key
    
    #$changelog.changelog.histories.items
    #break;
    
}





$transitions = @()

for ($i=0; $i -lt $statusItems.length - 1; $i++) {
	
    $from = $statusItems[$i]
    $to = $statusItems[$i+1]

    if($from.key -eq $to.key)
    {
        $transition = New-Object PSObject -Property @{
            #name = $from.toStatus + "_" + $to.toStatus
            name = $from.toStatus
            span = (NEW-TIMESPAN –Start $from.date –End $to.date).TotalMinutes
            key = $from.key
            fixVersion = $from.fixVersion
            component = $from.component

        }

        #$from.date
        #$to.date
        #$transition.span

        $transition
        $transitions += $transition
    }

    $i / ($statusItems.length - 1) *100
}


#$transitions | Group-Object name | %{
#    New-Object psobject -Property @{
#        Item = $_.Name
#        Sum = ($_.Group | Measure-Object span -Average).Sum
#    }
#}
$startAt += $maxRecords


#$response.total;
#$startAt;
#break;

} while ($response.total -gt $startAt)

$timestamp = Get-Date -Format o | foreach {$_ -replace ":", "."}
$filename = "C:\Users\robertk\OneDrive for Business\Documents\dev process changes\issuesWithFixVersion" + $timestamp + ".csv"

$transitions | Export-CSV $filename

#$statusItems | Export-CSV 'C:\Users\robertk\Documents\dev process changes\issuesWithFixVersion.csv'


