module.exports = class SplitByPathPlugin {
  /**
   * @param buckets {Array<{name: string, regex: RegExp}>}
   */
  constructor ({buckets}) {
    this.buckets = buckets
  }
  apply (compiler) {
    const {buckets} = this
    compiler.plugin('this-compilation', (compilation) => {
      if (compilation.compiler.parentCompilation) { return }
      compilation.plugin('optimize-chunks', (chunks) => {
        chunks
          .filter((chunk) => chunk.hasEntryModule() && chunk.name)
          .forEach(function (chunk) {
            const other = new Set()
            chunk.modules.slice().forEach((mod) => {
              const b = buckets.find(({regex}) => regex.test(mod.resource))
              if (b) {
                other.add(b.name)
                chunk.moveModule(mod, compilation.addChunk(b.name))
              }
            })
            other.forEach((name) => {
              const otherChunk = compilation.addChunk(name)
              otherChunk.addChunk(chunk)
              chunk.addParent(otherChunk)
              chunk.entrypoints.forEach((ep) => {
                ep.insertChunk(otherChunk, chunk)
              })
            })
          })
      })
    })
  }
}
