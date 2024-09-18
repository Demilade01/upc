interface ServerTagsProps {
  tags: string[];
}

const ServerTags: React.FC<ServerTagsProps> = ({ tags }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-white mb-4">Tags</h2>
    <div className="bg-black-700/80 rounded-lg p-4 flex flex-wrap gap-2">
      {tags.map(tag => (
        <span key={tag} className="px-3 py-1 bg-primary text-white rounded-lg text-sm">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default ServerTags;
