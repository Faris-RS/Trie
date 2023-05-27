function createTrieNode() {
  return {
    children: {},
    isEndOfWord: false,
  };
}

function createTrie() {
  const root = createTrieNode();
  function insert(word) {
    let currentNode = root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!currentNode.children[char]) {
        currentNode.children[char] = createTrieNode();
      }
      currentNode = currentNode.children[char];
    }
    currentNode.isEndOfWord = true;
  }

  function search(word) {
    let currentNode = root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!currentNode.children[char]) {
        return false;
      }
      currentNode = currentNode.children[char];
    }
    return currentNode.isEndOfWord;
  }

  function startsWith(prefix, needFull) {
    let currentNode = root;
    let word = "";
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!currentNode.children[char]) {
        return false;
      }
      currentNode = currentNode.children[char];
      word += char;
    }

    if (needFull) {
      const result = [];
      function traverse(node, currentWord) {
        if (node.isEndOfWord) {
          result.push(word + currentWord);
        }
        for (let char in node.children) {
          traverse(node.children[char], currentWord + char);
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

// console.log(trie.search("apple")); // true
// console.log(trie.search("grape")); // false

console.log(trie.startsWith("app", true));

// console.log(trie.startsWith("ora", false)); // true
// console.log(trie.startsWith("ban", false)); // true
// console.log(trie.startsWith("gr", false)); // false

// trie.log();
