export default async function getVolumes(volumes) {
  let disk = [];
  let disks = {};

  for (let i = 0, len1 = volumes.length; i < len1; i += 1) {
    let stop = false;
    for (let k = 0, len2 = disk.length; k <= len2; k += 1) {
      if (disk[k] && disk[k][0] === volumes[i].volume) {
        disk[k][1] += volumes[i].size;
        stop = true;
        break;
      }
    }
    if (!stop) disk.push([volumes[i].volume, volumes[i].size]);
    // console.log(disk);
  }

  for (let i = 0, len = disk.length; i < len; i += 1) {
    disks[disk[i][0]] = `${disk[i][1].toString()}B`;
  }
  disks = JSON.stringify(disks);

  console.log(disks);
  return disks;
}
