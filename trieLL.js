function createTrieNode() {
  return {
    character: null,
    isEndOfWord: false,
    next: null,
    children: null,
  };
}

function createTrie() {
  const root = createTrieNode();

  function insert(word) {
    let currentNode = root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      let childNode = currentNode.children;
      while (childNode !== null && childNode.character !== char) {
        childNode = childNode.next;
      }
      if (childNode === null) {
        childNode = createTrieNode();
        childNode.character = char;
        childNode.next = currentNode.children;
        currentNode.children = childNode;
      }
      currentNode = childNode;
    }
    currentNode.isEndOfWord = true;
  }

  function search(word) {
    let currentNode = root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      let childNode = currentNode.children;
      while (childNode !== null && childNode.character !== char) {
        childNode = childNode.next;
      }
      if (childNode === null) {
        return false;
      }
      currentNode = childNode;
    }
    return currentNode.isEndOfWord;
  }

  function startsWith(prefix, needFull) {
    let currentNode = root;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      let childNode = currentNode.children;
      while (childNode !== null && childNode.character !== char) {
        childNode = childNode.next;
      }

      if (childNode === null) {
        return false;
      }
      currentNode = childNode;
    }

    if (needFull) {
      const result = [];

      function traverse(node, currentWord) {
        if (node.isEndOfWord) {
          result.push(prefix + currentWord);
        }
        let childNode = node.children;
        while (childNode !== null) {
          traverse(childNode, currentWord + childNode.character);
          childNode = childNode.next;
        }
      }

      traverse(currentNode, "");
      return result;
    }

    return true;
  }

  function log() {
    console.log(JSON.stringify(root));
  }

  return {
    insert,
    search,
    startsWith,
    log,
  };
}

// Usage example
const trie = createTrie();

trie.insert("apple");
trie.insert("banana");
trie.insert("orange");

console.log(trie.search("apple")); // true
console.log(trie.search("grape")); // false

console.log(trie.startsWith("app", true)); // ["apple"]
console.log(trie.startsWith("ora", true)); // ["orange"]
console.log(trie.startsWith("ban", true)); // ["banana"]
console.log(trie.startsWith("gr", true)); // false

console.log(trie.startsWith("app", false)); // true
console.log(trie.startsWith("ora", false)); // true
console.log(trie.startsWith("ban", false)); // true
console.log(trie.startsWith("gr", false)); // false

// trie.log();
