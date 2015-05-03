# To be called by MSBuild
# $args[0] is solution directory

# hand.min.js should be generated manually as of now
$basejs = gc $(join-path $args[0] hand.base.js)
$cssjs = gc $(join-path $args[0] hand.css.js)
sc $(join-path $args[0] hand.js) $($basejs + $cssjs)