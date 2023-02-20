export function formatAddress (address: string){
    return address
    .substring(0, 5)
    .concat('...')
    .concat(
      address.substring(address.length -4, address.length)
    )
}