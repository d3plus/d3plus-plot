/**
    Adds buffers in between ordinal axis ticks.
    @param {Array} domain
    @private
*/
export default function(domain) {

  if (domain.includes("d3plus-buffer-start")) return domain;

  const newDomain = ["d3plus-buffer-start"];
  domain.forEach(b => {
    newDomain.push(b);
    newDomain.push(`d3plus-buffer-${b}`);
  });

  return newDomain;

}
