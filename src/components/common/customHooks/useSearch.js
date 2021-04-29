export default function useSearch(initialData, keyCategory, searchData) {
  if (searchData.length > 0) {
    let output = [];
    if (searchData === '$#&main') {
      return initialData;
    } else if (searchData === '$#&published') {
      output = initialData.filter(item => item.published);
    } else if (searchData === '$#&unpublished') {
      output = initialData.filter(item => !item.published);
    } else {
      output = initialData.filter(item =>
        item[keyCategory].toLowerCase().includes(searchData.toLowerCase())
      );
    }

    return output;
  } else {
    return initialData;
  }
}
