library(ggplot2)
library(data.table)
library(reshape2)
library(pastecs)


dt <- data.table(set)
sum <- aggregate(x=dt$span / 60  ,by=list(dt$key, dt$name), sum)

quantile(sum[sum$Group.2 %in% c("Development Started"),]$x, type=4)
quantile(sum[sum$Group.2 %in% c("In Progress"),]$x, type=4)





