const formatter = Intl.NumberFormat('en', {notation: 'compact'})

export const formatLikes = (likes) =>{
    return formatter.format(likes)
}